import { useState } from "react";
import { Button, Container, Title, Stack, Loader, Center } from "@mantine/core";
import { useSelector } from "react-redux";
import getTodayAppointmentByDoctorId from "../../Services/AppointmentService";
import AppointmentList from "../Doctor/AppointmentDetails/AppointmentList";


const Appointments = () => {

  const [appointment,setAppointment]=useState([]);
  const [loading,setLoading] = useState(false);
  const token = useSelector((state:any) => state.jwtSlice);
  const user = useSelector((state:any) => state.userSlice);
  const userId = user?.decode?.userId;
  const handleGetTodayAppointments =  async () => {
    console.log("Button Clicked");
    setLoading(true)
    try {
      const response = await getTodayAppointmentByDoctorId(5,token)
      console.log("The List of Doctor is = ", response)
      setAppointment(response)
      setLoading(false)
    } catch (error) {
      console.log("Error Fetching Appointment List",error)
    }
  }

  return (
    <Container size="md" mt="xl">
      <Stack gap="lg">
        <Title order={2}>Doctor Dashboard</Title>


        <Button onClick={handleGetTodayAppointments} size="md">
          Get Today Appointment List
        </Button>


        {loading && (
          <Center>
            <Loader />
          </Center>
        )}

        

        {!loading && appointment.length > 0 && (
          <AppointmentList appointment={appointment}/>
        )}
      </Stack>
    </Container>
  );
}

export default Appointments
