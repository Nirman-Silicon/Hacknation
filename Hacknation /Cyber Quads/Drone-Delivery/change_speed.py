from takeoff import takeoff
from pymavlink import mavutil

the_connection=mavutil.mavlink_connection('udpin:localhost:14551')

the_connection.wait_heartbeat()
print("Heartbeat from system (system %u component %u)" %
      (the_connection.target_system, the_connection.target_component))

takeoff(5)

def speed (speed):
    # the_connection.mav.command_long_send(the_connection.target_system, the_connection.target_component, mavutil.mavlink.MAV_CMD_DO_CHANGE_SPEED, 30, 1, 0, 350, 10, 10, 10, 10)

    the_connection.mav.command_long_send(the_connection.target_system, the_connection.target_component, mavutil.mavlink.MAV_CMD_DO_CHANGE_SPEED, 0,0, speed, 0, 0, 0, 0, 0)
    print('Speed: ',speed)

speed(2)