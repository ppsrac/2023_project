import time
import threading
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

driver = None
startStatus = True
defaultUrl = "http://i9a202.p.ssafy.io/kiosk/home"
BUZZER_PIN = 36

def setup():
    global driver
    print("Setup processing...")
    # chrome web browser setting
    chrome_options = Options()
    chrome_options.add_argument('lang=ko_KR')
    chrome_options.add_argument('start-fullscreen')
    #chrome_options.add_experimental_option("detach", True)
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    
    # web driver start
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(defaultUrl)
    print("Setup complete!")

def monitoringUrl():
    global startStatus, driver
    try:
        while True:
            if driver.current_url == defaultUrl:
                startStatus = True
                # print("Now WebClient is start status.")
            time.sleep(2)

    except KeyboardInterrupt:
        print("Monitoring Exit")

def handle_rfid_tag(tag_id):
    global startStatus, driver
    print("태그 ID:", tag_id)
    if startStatus:
        startStatus = False
        activate_buzzer(frequency=2000, duration=0.3)
        print("Send data to Web Client...")
        # selenium ver 3.x
        # driver.find_element_by_id("tag").send_keys(tag_id)
        # selenium ver 4.x
        # driver.find_element(By.ID, "tag").send_keys(tag_id)
        try:
            submit_id = str(tag_id)[:4]
            driver.find_element(By.ID, "tag").send_keys(submit_id)
            element = driver.find_element(By.ID, "submit")
            driver.execute_script("arguments[0].click();", element)
        except Exception as e:
            print(e)

def activate_buzzer(frequency, duration):
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)
    GPIO.setup(BUZZER_PIN, GPIO.OUT)
    pwm = GPIO.PWM(BUZZER_PIN, frequency)
    pwm.start(99)
    time.sleep(duration)
    pwm.stop()
    GPIO.cleanup()

def rfid_tagging():
    GPIO.setmode(GPIO.BOARD)
    reader = SimpleMFRC522()

    try:
        print("RFID read ready")
        while True:
            id, texts = reader.read()
            if id:
                handle_rfid_tag(id)
            time.sleep(0.5) 
    except KeyboardInterrupt:
        print("RFID process EXIT")
    finally:
        GPIO.cleanup()

if __name__ == "__main__":
    setup()

    monitoring_thread = threading.Thread(target=monitoringUrl)
    monitoring_thread.start()

    rfid_thread = threading.Thread(target=rfid_tagging)
    rfid_thread.start()

    monitoring_thread.join()
    rfid_thread.join()

    print("EXIT")


