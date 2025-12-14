import { Table, Card, Text } from "@mantine/core";

export default function AppointmentList({ appointment }) {
  return (
    <Card shadow="sm" radius="xl" withBorder>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Patient Name</Table.Th>
            <Table.Th>Time</Table.Th>
            <Table.Th>Reason</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {appointment.map((appointment) => (
            <Table.Tr key={appointment.appointmentId}>
              <Table.Td>
                <Text fw={500}>{appointment.patientName}</Text>
              </Table.Td>
              <Table.Td>{appointment.time}</Table.Td>
              <Table.Td>{appointment.reason}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
