import { useEffect, useState } from "react";
import {
Container,
Paper,
Title,
Text,
Stack,
Group,
Badge,
Loader,
} from "@mantine/core";
import { IconShoppingCart, IconCalendar } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import axiosInstance from "../../Interceptor/AxiosInterceptor";
import { getAllSalesData } from "../../Services/PharmacyService";

export default function PatientOrderHistory() {
const [appointments, setAppointments] = useState([]);
const [sales, setSales] = useState([]);
const [finalData, setFinalData] = useState([]);
const [loading, setLoading] = useState(true);

const token = useSelector((state: any) => state.jwtSlice);
const user = useSelector((state: any) => state.userSlice);

const fetchAppointments = async () => {
try {
const res = await axiosInstance.get(
`/appointment/details/patient/${user?.decoded?.profileId}`,
{ headers: { Authorization: `Bearer ${token}` } }
);

  setAppointments(res.data || []);
} catch (err) {
  console.error(err);
}

};

const fetchSales = async () => {
try {
  const res = await getAllSalesData(token);
  
  const filtered = res.filter(
    (item: any) => item.patientId === user?.decoded?.profileId
  );

  setSales(filtered || []);
} catch (err) {
  console.error(err);
}

};

//  MERGE + SORT
const processData = () => {
const appointmentData = appointments.map((item: any) => ({
type: "APPOINTMENT",
date: item.appointmentDate,
doctorName: item.doctorName,
amount: 500,
}));

const salesData = sales.map((item: any) => ({
  type: "PHARMACY",
  date: item.saleDate,
  prescriptionId: item.prescriptionId,
  amount: item.totalAmount,
}));

const merged = [...appointmentData, ...salesData].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

setFinalData(merged);
setLoading(false);

};

useEffect(() => {
const init = async () => {
await fetchAppointments();
await fetchSales();
};
init();
}, []);

useEffect(() => {
if (appointments.length || sales.length) {
processData();
}
}, [appointments, sales]);

if (loading) {
return ( <Container> <Loader /> </Container>
);
}

return ( <Container size="md"> <Title order={3}>Order History</Title>

  <Stack>
    {finalData.map((item: any, index) => (
      <Paper key={index} p="md" withBorder shadow="sm">
        <Group justify="space-between">

          {/* LEFT */}
          <Group>
            {item.type === "APPOINTMENT" ? (
              <IconCalendar size={24} />
            ) : (
              <IconShoppingCart size={24} />
            )}

            <div>
              {item.type === "APPOINTMENT" ? (
                <>
                  <Text fw={500}>
                    Appointment with Dr. {item.doctorName}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {item.date}
                  </Text>
                </>
              ) : (
                <>
                  <Text fw={500}>
                    Prescription #{item.prescriptionId}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {item.date}
                  </Text>
                </>
              )}
            </div>
          </Group>

          {/* RIGHT */}
          <Stack align="flex-end" gap={4}>
            <Badge color={item.type === "APPOINTMENT" ? "blue" : "green"}>
              {item.type}
            </Badge>
            <Text fw={600}>₹{item.amount}</Text>
          </Stack>

        </Group>
      </Paper>
    ))}
  </Stack>
</Container>
);
}
