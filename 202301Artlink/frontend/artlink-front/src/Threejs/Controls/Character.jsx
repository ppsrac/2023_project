import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, useRapier } from "@react-three/rapier";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import useFollowCam from "./hooks/useFollowCam";

export default function Character() {
  const characterRef = useRef();
  const characterModelRef = useRef();
  // Character controls
  const maxVelLimit = 5;
  const turnVelMultiplier = 0.1;
  const turnSpeed = 18;
  const sprintMult = 1.5;
  const jumpVel = 4;
  const sprintJumpMult = 1.2;
  const airDragMultiplier = 0.01;
  const dragDampingC = 0.05;
  const accDeltaTime = 8;
  const moveImpulsePointY = 0.5;
  const camFollowMult = 6;
  // Floating Ray 설정값 변수로 지정
  const rayOriginOffest = {
    x: 0,
    y: -0.35,
    z: -4,
  };
  const rayLength = 1.5;
  const rayDir = { x: 0, y: -1, z: 0 };
  const floatingDis = 0.6;
  const springK = 1.5;
  const dampingC = 0.2;
  // Slope Ray 설정값 변수로 지정
  const slopeRayOriginOffest = 0.23;
  const slopeRayLength = 1.5;
  const slopeRayDir = { x: 0, y: -1, z: 0 };
  const slopeUpExtraForce = 1;
  const slopeDownExtraForce = 3;

  // autoBalance force 설정값 변수로 지정
  const autoBalance = true;
  const autoBalanceSpringK = 0.4;
  const autoBalanceDampingC = 0.025;

  /**
   * keyboard controls setup
   */
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  // can jump setup
  const [canJump, setCanJump] = useState(false);

  // on moving object state
  const [isOnMovingObject, setIsOnMovingObject] = useState(false);
  const movingObjectVelocity = useMemo(() => new THREE.Vector3());
  const movingObjectVelocityInCharacterDir = useMemo(() => new THREE.Vector3());
  const distanceFromCharacterToObject = useMemo(() => new THREE.Vector3());
  const objectAngvelToLinvel = useMemo(() => new THREE.Vector3());

  /**
   * Initial setup
   */
  let dirLight;

  /**
   * Load camera pivot and character move preset
   */
  const { pivot, followCam } = useFollowCam();
  const pivotPosition = useMemo(() => new THREE.Vector3());
  const modelEuler = useMemo(() => new THREE.Euler(), []);
  const modelQuat = useMemo(() => new THREE.Quaternion(), []);
  const moveImpulse = useMemo(() => new THREE.Vector3());
  const movingDirection = useMemo(() => new THREE.Vector3());
  const moveAccNeeded = useMemo(() => new THREE.Vector3());
  const jumpDirection = useMemo(() => new THREE.Vector3());
  const currentVel = useMemo(() => new THREE.Vector3());
  const currentPos = useMemo(() => new THREE.Vector3());
  const dragForce = useMemo(() => new THREE.Vector3());
  const dragAngForce = useMemo(() => new THREE.Vector3());
  const wantToMoveVel = useMemo(() => new THREE.Vector3());

  /**
   * Floating Ray setup
   */
  const springDirVec = useMemo(() => new THREE.Vector3());
  const characterMassForce = useMemo(() => new THREE.Vector3());
  const rayOrigin = useMemo(() => new THREE.Vector3());

  /**
   * Slope detection ray setup
   */
  let slopeAngle = null;
  let actualSlopeNormal = null;
  let actualSlopeAngle = null;
  const actualSlopeNormalVec = useMemo(() => new THREE.Vector3());
  const floorNormal = useMemo(() => new THREE.Vector3(0, 1, 0));
  const slopeRayOriginRef = useRef();
  const slopeRayorigin = useMemo(() => new THREE.Vector3());

  /**
   * Character moving function
   */
  const moveCharacter = (delta, run, slopeAngle, movingObjectVelocity) => {
    /**
     * Setup moving direction
     */
    // Only apply slope extra force when slope angle is between 0.2-1, actualSlopeAngle < 1
    if (
      actualSlopeAngle < 1 &&
      Math.abs(slopeAngle) > 0.2 &&
      Math.abs(slopeAngle) < 1
    ) {
      movingDirection.set(0, Math.sin(slopeAngle), Math.cos(slopeAngle));
    } else if (actualSlopeAngle >= 1) {
      movingDirection.set(
        0,
        Math.sin(slopeAngle) > 0 ? 0 : Math.sin(slopeAngle),
        Math.sin(slopeAngle) > 0 ? 0.1 : 1
      );
    } else {
      movingDirection.set(0, 0, 1);
    }

    // Apply character quaternion to moving direction
    movingDirection.applyQuaternion(characterModelRef.current.quaternion);
    // Calculate moving object velocity direction according to character moving direction
    movingObjectVelocityInCharacterDir
      .copy(movingObjectVelocity)
      .projectOnVector(movingDirection)
      .multiply(movingDirection);
    // Calculate angle between moving object velocity direction and character moving direction
    const angleBetweenCharacterDirAndObjectDir =
      movingObjectVelocity.angleTo(movingDirection);

    /**
     * Setup rejection velocity
     */
    /**
     * Calculate required accelaration and force: a = Δv/Δt
     * If it's on a moving/rotating platform, apply platform velocity to Δv accordingly
     */
    moveAccNeeded.set(
      (movingDirection.x *
        (maxVelLimit + movingObjectVelocityInCharacterDir.x) *
        (run ? sprintMult : 1) -
        (currentVel.x -
          movingObjectVelocity.x *
            Math.sin(angleBetweenCharacterDirAndObjectDir))) /
        accDeltaTime,
      0,
      (movingDirection.z *
        (maxVelLimit + movingObjectVelocityInCharacterDir.z) *
        (run ? sprintMult : 1) -
        (currentVel.z -
          movingObjectVelocity.z *
            Math.sin(angleBetweenCharacterDirAndObjectDir))) /
        accDeltaTime
    );

    // Wanted to move force function: F = ma
    const moveForceNeeded = moveAccNeeded.multiplyScalar(
      characterRef.current.mass()
    );

    /**
     * Check if character complete turned to the wanted direction
     */
    const characterRotated =
      Math.sin(characterModelRef.current.rotation.y).toFixed(3) ==
      Math.sin(modelEuler.y).toFixed(3);

    // If character hasn't complete turning, change the impulse quaternion follow characterModelRef quaternion
    if (!characterRotated) {
      moveImpulse.set(
        moveForceNeeded.x *
          turnVelMultiplier *
          (canJump ? 1 : airDragMultiplier), // if it's in the air, give it less control
        // -rejectVel.x * dragDampingC,
        slopeAngle === null || slopeAngle == 0 // if it's on a slope, apply extra up/down force to the body
          ? 0
          : movingDirection.y *
              turnVelMultiplier *
              (movingDirection.y > 0 // check it is on slope up or slope down
                ? slopeUpExtraForce
                : slopeDownExtraForce) *
              (run ? sprintMult : 1),
        moveForceNeeded.z *
          turnVelMultiplier *
          (canJump ? 1 : airDragMultiplier) // if it's in the air, give it less control
        // -rejectVel.z * dragDampingC
      );
    }
    // If character complete turning, change the impulse quaternion default
    else {
      moveImpulse.set(
        moveForceNeeded.x * (canJump ? 1 : airDragMultiplier),
        // -rejectVel.x * dragDampingC,
        slopeAngle === null || slopeAngle == 0 // if it's on a slope, apply extra up/down force to the body
          ? 0
          : movingDirection.y *
              (movingDirection.y > 0 // check it is on slope up or slope down
                ? slopeUpExtraForce
                : slopeDownExtraForce) *
              (run ? sprintMult : 1),
        moveForceNeeded.z * (canJump ? 1 : airDragMultiplier)
        // -rejectVel.z * dragDampingC
      );
    }

    // Move character at proper direction and impulse
    characterRef.current.applyImpulseAtPoint(
      moveImpulse,
      {
        x: currentPos.x,
        y: currentPos.y + moveImpulsePointY,
        z: currentPos.z,
      },
      true
    );
  };

  /**
   * Character auto balance function
   */
  const autoBalanceCharacter = () => {
    dragAngForce.set(
      -autoBalanceSpringK * characterRef.current.rotation().x -
        characterRef.current.angvel().x * autoBalanceDampingC,
      0,
      -autoBalanceSpringK * characterRef.current.rotation().z -
        characterRef.current.angvel().z * autoBalanceDampingC
    );
    characterRef.current.applyTorqueImpulse(dragAngForce, true);
  };

  useFrame((state, delta) => {
    // Character current position
    currentPos.copy(characterRef.current.translation());

    /**
     * Apply character position to directional light
     */
    if (dirLight) {
      dirLight.position.x = currentPos.x + 20;
      dirLight.position.y = currentPos.y + 30;
      dirLight.position.z = currentPos.z + 10;
      dirLight.target.position.copy(currentPos);
    }

    /**
     * Getting all the useful keys from useKeyboardControls
     */
    const { forward, backward, leftward, rightward, jump, run } = getKeys();

    // Getting moving directions
    if (forward) {
      // Apply camera rotation to character model
      modelEuler.y = pivot.rotation.y;
    } else if (backward) {
      // Apply camera rotation to character model
      modelEuler.y = pivot.rotation.y + Math.PI;
    } else if (leftward) {
      // Apply camera rotation to character model
      modelEuler.y = pivot.rotation.y + Math.PI / 2;
    } else if (rightward) {
      // Apply camera rotation to character model
      modelEuler.y = pivot.rotation.y - Math.PI / 2;
    }
    if (forward && leftward) {
      // Apply camera rotation to character model
      modelEuler.y = pivot.rotation.y + Math.PI / 4;
    } else if (forward && rightward) {
      // Apply camera rotation to character model
      modelEuler.y = pivot.rotation.y - Math.PI / 4;
    } else if (backward && leftward) {
      // Apply camera rotation to character model
      modelEuler.y = pivot.rotation.y - Math.PI / 4 + Math.PI;
    } else if (backward && rightward) {
      // Apply camera rotation to character model
      modelEuler.y = pivot.rotation.y + Math.PI / 4 + Math.PI;
    }

    // Move character to the moving direction
    if (forward || backward || leftward || rightward)
      moveCharacter(delta, run, slopeAngle, movingObjectVelocity);

    // Character current velocity
    currentVel.copy(characterRef.current.linvel());

    // Jump impulse
    if (jump && canJump) {
      // characterRef.current.applyImpulse(jumpDirection.set(0, 0.5, 0), true);
      characterRef.current.setLinvel(
        {
          x: currentVel.x,
          y: run ? sprintJumpMult * jumpVel : jumpVel,
          z: currentVel.z,
        },
        true
      );
    }

    // Rotate character model
    modelQuat.setFromEuler(modelEuler);
    characterModelRef.current.quaternion.rotateTowards(
      modelQuat,
      delta * turnSpeed
    );

    /**
     *  Camera movement
     */
    pivotPosition.set(currentPos.x, currentPos.y + 0.5, currentPos.z);
    pivot.position.lerp(pivotPosition, delta * camFollowMult);
    state.camera.lookAt(pivot.position);

    /**
     * Ray casting detect if on ground
     */
    rayOrigin.addVectors(currentPos, rayOriginOffest);
    const rayCast = new rapier.Ray(rayOrigin, rayDir);
    const rayHit = world.castRay(
      rayCast,
      rayLength,
      true,
      null,
      null,
      characterRef.current
    );

    if (rayHit && rayHit.toi < floatingDis + 0.1) {
      setCanJump(true);
    } else {
      setCanJump(false);
    }

    /**
     * Ray detect if on rigid body or dynamic platform, then apply the linear velocity and angular velocity to character
     */
    if (rayHit && canJump) {
      const rayHitObjectBodyType = rayHit.collider.parent().bodyType();
      const rayHitObjectBodyMass = rayHit.collider.parent().mass();
      // Body type 0 is rigid body, body type 1 is fixed body, body type 2 is kinematic body
      // And iff it stands on big mass object (>0.5)
      if (
        (rayHitObjectBodyType === 0 || rayHitObjectBodyType === 2) &&
        rayHitObjectBodyMass > 0.5
      ) {
        setIsOnMovingObject(true);
        // Calculate distance between character and moving object
        distanceFromCharacterToObject
          .copy(currentPos)
          .sub(rayHit.collider.parent().translation());
        // Moving object linear velocity
        const movingObjectLinvel = rayHit.collider.parent().linvel();
        // Moving object angular velocity
        const movingObjectAngvel = rayHit.collider.parent().angvel();
        // Combine object linear velocity and angular velocity to movingObjectVelocity
        movingObjectVelocity.set(
          movingObjectLinvel.x +
            objectAngvelToLinvel.crossVectors(
              movingObjectAngvel,
              distanceFromCharacterToObject
            ).x,
          movingObjectLinvel.y,
          movingObjectLinvel.z +
            objectAngvelToLinvel.crossVectors(
              movingObjectAngvel,
              distanceFromCharacterToObject
            ).z
        );
      } else {
        setIsOnMovingObject(false);
        movingObjectVelocity.set(0, 0, 0);
      }
    }

    /**
     * Slope ray casting detect if on slope
     */
    slopeRayOriginRef.current.getWorldPosition(slopeRayorigin);
    slopeRayorigin.y = rayOrigin.y;
    const slopeRayCast = new rapier.Ray(slopeRayorigin, slopeRayDir);
    const slopeRayHit = world.castRay(
      slopeRayCast,
      slopeRayLength,
      true,
      null,
      null,
      characterRef.current
    );

    // Calculate slope angle
    if (slopeRayHit && rayHit && slopeRayHit.toi < floatingDis + 0.5) {
      if (canJump) {
        slopeAngle = Math.atan(
          (rayHit.toi - slopeRayHit.toi) / slopeRayOriginOffest
        ).toFixed(2);
        actualSlopeNormal = slopeRayHit.collider.castRayAndGetNormal(
          slopeRayCast,
          floatingDis + 0.5
        ).normal;
        actualSlopeNormalVec.set(
          actualSlopeNormal.x,
          actualSlopeNormal.y,
          actualSlopeNormal.z
        );
        actualSlopeAngle = actualSlopeNormalVec.angleTo(floorNormal);
        // console.log(actualSlopeNormalVec);
      } else {
        slopeAngle = null;
      }
    }

    /**
     * Apply floating force
     */
    if (rayHit && !jump && canJump) {
      if (rayHit != null) {
        // console.log(rayHit.collider.castRayAndGetNormal(rayCast,rayLength,true).normal);
        const floatingForce =
          springK * (floatingDis - rayHit.toi) -
          characterRef.current.linvel().y * dampingC;
        characterRef.current.applyImpulse(
          springDirVec.set(0, floatingForce, 0)
        );

        // Apply opposite force to standing object
        characterMassForce.set(
          0,
          (-characterRef.current.mass() * characterRef.current.gravityScale()) /
            10,
          0
        );
        rayHit.collider
          .parent()
          .applyImpulseAtPoint(characterMassForce, currentPos, true);
      }
    }

    /**
     * Apply drag force if it's not moving
     */
    // not on a moving object
    if (
      !forward &&
      !backward &&
      !leftward &&
      !rightward &&
      canJump &&
      !isOnMovingObject
    ) {
      dragForce.set(
        -currentVel.x * dragDampingC,
        0,
        -currentVel.z * dragDampingC
      );
      characterRef.current.applyImpulse(dragForce);
    }
    // on a moving object
    else if (
      !forward &&
      !backward &&
      !leftward &&
      !rightward &&
      canJump &&
      isOnMovingObject
    ) {
      dragForce.set(
        (movingObjectVelocity.x - currentVel.x) * dragDampingC * 2,
        0,
        (movingObjectVelocity.z - currentVel.z) * dragDampingC * 2
      );
      characterRef.current.applyImpulse(dragForce, true);
    }

    /**
     * Apply auto balance force to the character
     */
    if (autoBalance) {
      autoBalanceCharacter();
    }
  });

  return (
    <RigidBody
      colliders={false}
      position={[0, 10, 0]}
      friction={-0.5}
      ref={characterRef}
    >
      <CapsuleCollider args={[0.35, 0.3]} />
      <group ref={characterModelRef}>
        <mesh
          position={[
            rayOriginOffest.x,
            rayOriginOffest.y,
            rayOriginOffest.z + slopeRayOriginOffest,
          ]}
          ref={slopeRayOriginRef}
        >
          {/* <boxGeometry args={[0.15, 0.15, 0.15]} /> */}
        </mesh>
      </group>
    </RigidBody>
  );
}
