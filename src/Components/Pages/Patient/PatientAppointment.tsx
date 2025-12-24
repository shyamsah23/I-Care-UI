import { useTextSelection } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllDoctorsList } from '../../../Services/ProfileService'
import { Container, Table, Button, Select, Group, Text, Loader, Box, Center,TextInput } from "@mantine/core";

const PatientAppointment = () => {

    const [loading, setLoading] = useState(false)
    const [doctor, setDoctor] = useState([])
    const [departement, setDepartment] = useState("All")
    const [searchName, setSearchName] = useState("")

    const token = useSelector((state) => state.jwtSlice);

    const DEPARTMENTS = [
        { value: "All", label: "All" },
        { value: "Cardiology", label: "Cardiology" },
        { value: "Dermatology", label: "Dermatology" },
        { value: "Orthopedics", label: "Orthopedics" },
    ];

    useEffect(() => {
        setLoading(true)
        const fetchDoctorList = async () => {
            try {
                const response = await getAllDoctorsList(token)
                setDoctor(response);
                setLoading(false)
            }
            catch (error) {
                console.log("Error While fetching ", error)
            }

        }

        fetchDoctorList()

    }, [token])

    const filteredDoctors = departement == "All" ? doctor : doctor.filter((doc) => doc.department == departement)
    const handleBookAppointment = () => {
        console.log("Schedule Appointment")
    }

    return (
        <Container size="lg">
            <Text size="xl" fw={700} mb="md">
                Book an Appointment
            </Text>


            <Group mb="md">
                <Select
                    label="Filter by Department"
                    data={DEPARTMENTS}
                    value={departement}
                    onChange={(value) => setDepartment(value || "All")}
                    placeholder="Select department"
                />
                <TextInput
                    label="Search by Doctor Name"
                    placeholder="Enter doctor name"
                    value={searchName} // Added
                    onChange={(event) => setSearchName(event.currentTarget.value)} // Added
                />
            </Group>


            {loading ? (
                <Center mt="xl">
                    <Loader />
                </Center>
            ) : (
                <Box>
                    <Table striped highlightOnHover withTableBorder>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Doctor Name</Table.Th>
                                <Table.Th>Department</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>


                        <Table.Tbody>
                            {filteredDoctors.length === 0 ? (
                                <Table.Tr>
                                    <Table.Td colSpan={3}>
                                        <Text ta="center">No doctors available</Text>
                                    </Table.Td>
                                </Table.Tr>
                            ) : (
                                filteredDoctors.map((doctor) => (
                                    <Table.Tr key={doctor.id}>
                                        <Table.Td>{doctor.name}</Table.Td>
                                        <Table.Td>{doctor.department}</Table.Td>
                                        <Table.Td>
                                            <Button
                                                size="xs"
                                                onClick={() => handleBookAppointment(doctor)}
                                            >
                                                Book Appointment
                                            </Button>
                                        </Table.Td>
                                    </Table.Tr>
                                ))
                            )}
                        </Table.Tbody>
                    </Table>
                </Box>
            )}
        </Container>
    );
}

export default PatientAppointment
