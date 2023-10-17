import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import useApiClient from "../../hooks/useApiClient";
import { useEffect, useState } from "react";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { AxiosError } from "axios";
import { AllowanceDeductionFormValues } from "../../formValues/AllowanceDeductionFormValues";
import { AllowanceDeductionFormResolver } from "../../resolvers/AllowanceDeductionFormResolver";
import { useForm } from "react-hook-form";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";

interface ModalProps {
  employeeId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  fetchAllowancesAndDeductions: () => void;
}

function AddAllowanceModal({
  isOpen,
  onClose,
  employeeId,
  fetchAllowancesAndDeductions,
}: ModalProps) {
  const [reasons, setReasons] = useState<{ id: number; description: string }[]>(
    []
  );
  const {
    register,
    handleSubmit,
    formState,
    /*     clearErrors,
    getValues,
    control, */
    reset,
  } = useForm<AllowanceDeductionFormValues>({
    resolver: AllowanceDeductionFormResolver,
  });

  const api = useApiClient();
  const toast = useToast();

  const fetchAllowancesReasons = async () => {
    await api
      .get<ApiResponse<{ id: number; description: string }[]>>(`/allowances`)
      .then((response) => {
        setReasons(response.data);
      })
      .catch((reason: AxiosError) => {
        console.log(reason);
      });
  };

  useEffect(() => {
    fetchAllowancesReasons();
  }, []);

  const onSubmit = handleSubmit(async (employeeAllowanceData) => {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        api
          .post<{
            allowanceId: number;
            employeeId: number;
            amount: number;
          }>(`/allowances/employees/create`, {
            employeeId,
            allowanceId: employeeAllowanceData.reasonId,
            amount: employeeAllowanceData.amount,
          })
          .then((response) => {
            toast({
              description: `Bonificación agregada exitosamente!`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            fetchAllowancesAndDeductions();
            onClose();
            resolve(response);
          })
          .catch((error: AxiosError) => {
            console.log({
              employeeId,
              allowanceId: employeeAllowanceData.reasonId,
              amount: employeeAllowanceData.amount,
            });
            if (error.response && error.response.data) {
              const message = (error.response.data as ErrorResponseData)
                .message;
              toast({
                title: "Error",
                description: `${message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              reset();
            }
          });
      }, timeout);
    });
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={onSubmit} noValidate={true}>
        <ModalContent>
          <ModalHeader>Agregar bonificación a empleado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              mb={4}
              isRequired
              isInvalid={!!formState.errors.reasonId}
            >
              <FormLabel>Razón</FormLabel>
              <Select placeholder="Seleccionar razón" {...register("reasonId")}>
                {reasons.map((reason) => {
                  return (
                    <option key={reason.id} value={reason.id}>
                      {reason.description}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {formState.errors.reasonId?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!formState.errors.amount}>
              <FormLabel>Monto</FormLabel>
              <Input type="number" {...register("amount")} />
              <FormErrorMessage>
                {formState.errors.amount?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              type={"submit"}
              isLoading={formState.isSubmitting}
            >
              Agregar bonificación
            </Button>
            <Button colorScheme="orange" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

function AddDeductionModal({
  isOpen,
  onClose,
  employeeId,
  fetchAllowancesAndDeductions,
}: ModalProps) {
  const [reasons, setReasons] = useState<{ id: number; description: string }[]>(
    []
  );
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    getValues,
    control,
    reset,
  } = useForm<AllowanceDeductionFormValues>({
    resolver: AllowanceDeductionFormResolver,
  });

  const api = useApiClient();
  const toast = useToast();

  const fetchDeductionsReasons = async () => {
    await api
      .get<ApiResponse<{ id: number; description: string }[]>>(`/deductions`)
      .then((response) => {
        setReasons(response.data);
      })
      .catch((reason: AxiosError) => {
        console.log(reason);
      });
  };

  useEffect(() => {
    fetchDeductionsReasons();
  }, []);

  const onSubmit = handleSubmit(async (employeeDeductionData) => {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        api
          .post<{
            deductionId: number;
            employeeId: number;
            amount: number;
          }>(`/deductions/employees/create`, {
            employeeId,
            deductionId: employeeDeductionData.reasonId,
            amount: employeeDeductionData.amount,
          })
          .then((response) => {
            toast({
              description: `Penalización agregada exitosamente!`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            fetchAllowancesAndDeductions();
            onClose();
            resolve(response);
          })
          .catch((error: AxiosError) => {
            console.log({
              employeeId,
              deductionId: employeeDeductionData.reasonId,
              amount: employeeDeductionData.amount,
            });
            if (error.response && error.response.data) {
              const message = (error.response.data as ErrorResponseData)
                .message;
              toast({
                title: "Error",
                description: `${message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              reset();
            }
          });
      }, timeout);
    });
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={onSubmit} noValidate={true}>
        <ModalContent>
          <ModalHeader>Agregar penalización a empleado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              mb={4}
              isRequired
              isInvalid={!!formState.errors.reasonId}
            >
              <FormLabel>Razón</FormLabel>
              <Select placeholder="Seleccionar razón" {...register("reasonId")}>
                {reasons.map((reason) => {
                  return (
                    <option key={reason.id} value={reason.id}>
                      {reason.description}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {formState.errors.reasonId?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!formState.errors.amount}>
              <FormLabel>Monto</FormLabel>
              <Input type="number" {...register("amount")} />
              <FormErrorMessage>
                {formState.errors.amount?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              type={"submit"}
              isLoading={formState.isSubmitting}
            >
              Agregar penalización
            </Button>
            <Button colorScheme="orange" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

/* function AddDeductionModal({ isOpen, onClose }: ModalProps) {
  const [reasons, setReasons] = useState<{ id: number; description: string }[]>(
    []
  );
  const api = useApiClient();

  const fetchAllowancesReasons = async () => {
    await api
      .get<ApiResponse<{ id: number; description: string }[]>>(`/deductions`)
      .then((response) => {
        setReasons(response.data);
      })
      .catch((reason: AxiosError) => {
        console.log(reason);
      });
  };

  useEffect(() => {
    fetchAllowancesReasons();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form>
        <ModalContent>
          <ModalHeader>Agregar penalización a empleado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Razón</FormLabel>
              <Select>
                {reasons.map((reason) => {
                  return <option key={reason.id}>{reason.description}</option>;
                })}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Monto</FormLabel>
              <Input type="number" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onSubmit={() => {
                console.log(`submiteed`);
              }}
            >
              Agregar penalización
            </Button>
            <Button colorScheme="orange">Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
} */

export { AddAllowanceModal, AddDeductionModal };
