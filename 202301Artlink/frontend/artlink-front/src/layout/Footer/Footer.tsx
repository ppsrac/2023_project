import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHouse, faFile } from "@fortawesome/free-solid-svg-icons";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const excludeFooterPaths: string[] = ["/", "/3d"];

function Footer() {
  const location = useLocation();
  const isKiosk = location.pathname.includes("kiosk");
  const is3D = location.pathname.includes("3d");
  const isExcludedHeaderPath: boolean = excludeFooterPaths.includes(
    location.pathname
  );

  return (
    <>
      {!isExcludedHeaderPath && (
        <>
          {!isKiosk && !is3D && (
            <>
              {/* <div className="footerHr"></div> */}
              <div className="footBody">
                <section className="footer">
                  <div className="social">
                    <a href="/home">
                      <FontAwesomeIcon
                        icon={faHouse}
                        size="sm"
                        style={{ margin: "auto" }}
                      />
                    </a>
                    <a href="https://lofty-cream-f31.notion.site/59d76894cbcc49b2b6f1adc747c01d06?v=1d3daf3fd2b5425bb03182aa2ab2abb7&pvs=4">
                      <FontAwesomeIcon
                        icon={faFile}
                        size="sm"
                        style={{ margin: "auto" }}
                      />
                    </a>
                    <a href="/contact">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        size="sm"
                        style={{ margin: "auto" }}
                      />
                    </a>
                    <a href="https://lab.ssafy.com/s09-webmobile3-sub2/S09P12A202">
                      <FontAwesomeIcon
                        style={{ margin: "auto" }}
                        size="sm"
                        icon={faGitlab}
                      />
                    </a>
                  </div>
                  <ul className="list">
                    <li>
                      <a href="/">Entrance</a>
                    </li>
                    <li>
                      <a href="/about">About</a>
                    </li>
                    <li>
                      <a href="/contact/team">Team</a>
                    </li>
                    <li>
                      <a href="/policy">Privacy Policy</a>
                    </li>
                  </ul>
                  <p className="copyright">
                    SSAFY Project - Team : Accpted 202 @ 2023
                  </p>
                </section>
              </div>
              <div style={{ padding: "2vh" }}></div>
            </>
          )}
        </>
      )}
    </>
  );
}
export default Footer;
