FROM eclipse-mosquitto

COPY mosquitto.conf /mosquitto/config/mosquitto.conf

CMD ["mosquitto", "-c", "/mosquitto/config/mosquitto.conf"]