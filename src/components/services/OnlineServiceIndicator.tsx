import { useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import {
  CheckCircleIcon,
  WarningIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Text, Spinner, HStack, Badge } from "@chakra-ui/react";

export const OnlineServiceIndicator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const getRandomDelay = () => Math.floor(Math.random() * 5000) + 1000;

  const api = useApiClient();

  const checkIfServiceIsOnline = () => {
    setIsLoading(true);

    // Simulate a delay of 1-2 seconds
    setTimeout(() => {
      api
        .get("/mock/check-online")
        .then(() => {
          setIsSuccess(true);
        })
        .catch(() => {
          setIsSuccess(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000); // Random delay between 1 and 2 seconds (in milliseconds)
  };

  useEffect(() => {
    // Initial loading with spinner
    const initialTimeout = setTimeout(() => {
      setIsLoading(false);
      checkIfServiceIsOnline();
    }, getRandomDelay());

    // Fetch data periodically
    const interval = setInterval(() => {
      setIsLoading(true);
      checkIfServiceIsOnline();
      console.log(`I triggered ${new Date().toTimeString()}`);
    }, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <HStack mx={8}>
      {isLoading ? (
        // Render spinner while loading
        /* You can replace this with your spinner component */
        <HStack>
          <Spinner size={"xs"} />
        </HStack>
      ) : isSuccess ? (
        // Render green circle if successful
        <HStack>
          <CheckCircleIcon color="green.500" />
        </HStack>
      ) : (
        // Render red icon if not successful
        <HStack>
          <WarningIcon color="red.500" />
        </HStack>
      )}
    </HStack>
  );
};
