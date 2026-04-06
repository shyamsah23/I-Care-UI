import {
  Card,
  Text,
  Group,
  Button,
  NumberInput,
  SimpleGrid,
  Badge,
  Select,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getAllMedicines } from "../../../../Services/PharmacyService";
import { addToCart } from "../../../../Slices/CartSlice";
import { errorNotification } from "../../../../Utility/NotificationUtility";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPrescriptionsForPatient } from "../../../../Services/MediaService";
import { setPrescription } from "../../../../Slices/PrescriptionSlice";

export const PatientPharmacy = () => {
  const token = useSelector((state: any) => state.jwtSlice);
  const cart = useSelector((state: any) => state.cart.items);
  const user = useSelector((state: any) => state.userSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  // const [selectedPrescription, setSelectedPrescription] = useState<
  //   number | null
  // >(null);
  const selectedPrescriptionId = useSelector(
    (state: any) => state.prescription.selectedPrescriptionId,
  );

  useEffect(() => {
    fetchMedicines();
    fetchPrescriptions();
  }, []);

  const fetchMedicines = async () => {
    const data = await getAllMedicines(token);
    setMedicines(data);
  };

  const fetchPrescriptions = async () => {
    const data = await getPrescriptionsForPatient(
      token,
      user?.decoded?.profileId,
    );
    setPrescriptions(data || []);
  };

  const handleAddToCart = (medicine: any) => {
    if (!selectedPrescriptionId) {
      errorNotification("Please select a prescription first");
      return;
    }

    const qty = quantities[medicine.id] || 1;

    const existingItem = cart.find((item: any) => item.id === medicine.id);
    const existingQty = existingItem ? existingItem.quantity : 0;

    const MAX_PER_USER = 10;

    if (qty <= 0) return;

    if (existingQty + qty > medicine.stock) {
      errorNotification("Not enough stock available");
      return;
    }

    if (existingQty + qty > MAX_PER_USER) {
      errorNotification("Maximum 10 units allowed per medicine");
      return;
    }

    dispatch(
      addToCart({
        id: medicine.id,
        name: medicine.name,
        unitPrice: medicine.unitPrice,
        stock: medicine.stock,
        quantity: qty,
      }),
    );
  };

  return (
    <Card shadow="md" p="lg">
      <Group justify="space-between" mb="md">
        <Text fw={700}>Available Medicines</Text>

        <Button
          onClick={() =>
            navigate("/patient/cart", {
              state: { prescriptionId: selectedPrescriptionId },
            })
          }
        >
          Go to Cart ({cart.length})
        </Button>
      </Group>

      {/* 🔥 Prescription Selector */}
      <Select
        label="Select Prescription"
        placeholder="Choose prescription"
        mb="md"
        data={prescriptions.map((p: any) => ({
          value: String(p.id),
          label: `Dr. ${p.doctorName} (${p.createdAt})`,
        }))}
        value={selectedPrescriptionId ? String(selectedPrescriptionId) : null}
        onChange={(val) => {
          if (!val) {
            dispatch(setPrescription(null));
          } else {
            dispatch(setPrescription(parseInt(val)));
          }
        }}
      />

      <SimpleGrid cols={3}>
        {medicines.map((med) => (
          <Card key={med.id} shadow="sm" p="md">
            <Text fw={600}>{med.name}</Text>
            <Text size="sm">{med.dosage}</Text>

            <Badge color={med.stock > 0 ? "green" : "red"}>
              {med.stock} in stock
            </Badge>

            <Text mt="sm">₹ {med.unitPrice}</Text>

            <NumberInput
              min={1}
              max={Math.min(med.stock, 10)}
              value={quantities[med.id] || 1}
              onChange={(val) =>
                setQuantities({
                  ...quantities,
                  [med.id]: Number(val),
                })
              }
            />

            <Button
              fullWidth
              mt="sm"
              disabled={med.stock === 0}
              onClick={() => handleAddToCart(med)}
            >
              Add to Cart
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Card>
  );
};
