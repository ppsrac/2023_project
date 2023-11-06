#include <functional>
#include <SPI.h>
#include <WiFi.h>
#include <string>
#include <DW1000Ranging.h>
#include <PubSubClient.h>
#include "link.h"

#define SPI_SCK 18
#define SPI_MISO 19
#define SPI_MOSI 23
#define DW_CS 4

// connection pins
const uint8_t PIN_RST = 27; // reset pin
const uint8_t PIN_IRQ = 34; // irq pin
const uint8_t PIN_SS = 4;   // spi select pin

// Btn pin config
const uint8_t REG_BUTTON = 35;
const uint8_t DEL_BUTTON = 22;

// LED pin config
const uint8_t ledR = 25;
const uint8_t ledG = 26;
const uint8_t ledB = 32;
const uint8_t ledArray[3] = { 1, 2, 3 };  // three led channels
const boolean invert = true;  

// TAG antenna delay defaults to 16384
// leftmost two bytes below will become the "short address"
char tag_addr[] = "7D:00:22:EA:82:60:3B:9C";
//int tag_short = 0x7D;
int tag_short = 5719;

// for Testing - Suhyun's Hotspot+
// const char* ssid = "AndroidHotspot9170";
// const char* password = "23465230"

// for Testing - Geonhee's Hotspot
// const char* ssid = "AndroidHotspot4415";
// const char* password = "53214415";

// for testing - 
const char* ssid = "A202";
const char* password = "ssafy13579";


const char* mqtt_server = "i9a202.p.ssafy.io";
// const char* mqtt_server = "172.26.9.218";
const int mqtt_port = 8884;

//WiFiClient client;
WiFiClient espClient;
PubSubClient client(espClient);

//declare topic for publish message
// DtoS : Device to Server
const char* pub_topic = "DtoS";
// const char* pub_topic = "DtoS";
// StoD : Server to Device
String sub_topic = "StoD/" + String(tag_short);

struct MyLink *uwb_data;
String all_json = "";
long runtime = 0;

volatile bool regBtnState = false;
volatile bool delBtnState = false;

void IRAM_ATTR regBtn() {
  regBtnState = true;
}

void IRAM_ATTR delBtn() {
  delBtnState = true;
}

//function for set up wifi===========================================
void setup_wifi() {
  delay(100);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length)
{
  int check;
  check = (int)payload[0];
  switch (check) {
    case 48: // RED LED for indicates failed test
      ledcWrite(1,255);
      delay(500);
      ledcWrite(1,0);
      break;
    case 49: // GREEN LED for indicates failed test
      ledcWrite(2,255);
      delay(500);
      ledcWrite(2,0);
      break;
    default: // BLUE LED for pending
      ledcWrite(3,255);
      delay(500);
      ledcWrite(3,0);
      break;
  }
}

void reconnect() {
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str()))
    {
      Serial.println("connected");
      // Serial.println(sub_topic);
      Serial.println(sub_topic.c_str());
      client.subscribe(sub_topic.c_str());
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup()
{
  Serial.begin(115200);
  delay(1000);
  setup_wifi();

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);


  pinMode(REG_BUTTON, INPUT);
  pinMode(DEL_BUTTON, INPUT);
  attachInterrupt(digitalPinToInterrupt(REG_BUTTON), regBtn, FALLING);
  attachInterrupt(digitalPinToInterrupt(DEL_BUTTON), delBtn, FALLING);

  ledcSetup(1,12000,8);
  ledcAttachPin(25,1);
  ledcSetup(2,12000,8);
  ledcAttachPin(26,2);
  ledcSetup(3,12000,8);
  ledcAttachPin(32,3);

  SPI.begin(SPI_SCK, SPI_MISO, SPI_MOSI);
  DW1000Ranging.initCommunication(PIN_RST, PIN_SS, PIN_IRQ); //Reset, CS, IRQ pin
  
  DW1000Ranging.attachNewRange(newRange);
  DW1000Ranging.attachNewDevice(newDevice);
  DW1000Ranging.attachInactiveDevice(inactiveDevice);

  DW1000Ranging.startAsTag(tag_addr, DW1000.MODE_LONGDATA_RANGE_LOWPOWER, false);

  uwb_data = init_link();

  // LED blink indicate setup complete
  ledcWrite(1,255);
  ledcWrite(2,255);
  ledcWrite(3,255);
  delay(500);
  ledcWrite(1,0);
  ledcWrite(2,0);
  ledcWrite(3,0);
}

void loop()
{
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  DW1000Ranging.loop();
  if ((regBtnState == true) && ((millis() - runtime) > 1000))
  {
    make_link_json(uwb_data, &all_json, tag_short);
    client.publish(pub_topic, all_json.c_str());
    runtime = millis();
    delay(50);
    regBtnState = false; 
  } else if ((delBtnState == true) && ((millis() - runtime) > 1000)) {
    // std::string del_data = "{\"T\":\"" + std::to_string(tag_short) + "\",\"E\":\"D\"}";
    String del_data = "{\"T\":\"" + String(tag_short) + "\",\"E\":\"D\"}";
    client.publish(pub_topic, del_data.c_str());
    Serial.println(del_data.c_str());
    runtime = millis();
    delay(50);
    delBtnState = false; 
  }
}

void newRange()
{
  char c[30];

  Serial.print("from: ");
  Serial.print(DW1000Ranging.getDistantDevice()->getShortAddress(), HEX);
  Serial.print("\t Range: ");
  Serial.print(DW1000Ranging.getDistantDevice()->getRange());
  Serial.print(" m");
  Serial.print("\t RX power: ");
  Serial.print(DW1000Ranging.getDistantDevice()->getRXPower());
  Serial.println(" dBm");
  fresh_link(uwb_data, DW1000Ranging.getDistantDevice()->getShortAddress(), DW1000Ranging.getDistantDevice()->getRange(), DW1000Ranging.getDistantDevice()->getRXPower());
}

void newDevice(DW1000Device *device)
{
  Serial.print("ranging init; 1 device added ! -> ");
  Serial.print(" short:");
  Serial.println(device->getShortAddress(), HEX);

  add_link(uwb_data, device->getShortAddress());
}

void inactiveDevice(DW1000Device *device)
{
  Serial.print("delete inactive device: ");
  Serial.println(device->getShortAddress(), HEX);
  delete_link(uwb_data, device->getShortAddress());
}
