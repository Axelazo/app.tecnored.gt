import { Card, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Configuration() {
  interface configOptionsProps {
    name: string;
    path: string;
    role: string;
  }
  const configOptions: Array<configOptionsProps> = [
    { name: "Planes", path: "plans", role: "user" },
    { name: "Establecimientos", path: "establishments", role: "user" },
    { name: "Departamentos", path: "departments", role: "user" },
  ];

  // State to store the index of the tab to be clicked
  const [activeTabIndex, setActiveTabIndex] = useState(-1);

  useEffect(() => {
    // Click the tab after the component is mounted
    if (activeTabIndex !== -1) {
      const tabButton = document.querySelectorAll(".chakra-tabs__tab")[
        activeTabIndex
      ] as HTMLElement;

      if (tabButton) {
        tabButton.click();
      }
    }
  }, [activeTabIndex]);

  // Component is mounted, set the activeTabIndex to the desired index (0 in this case)
  useEffect(() => {
    setActiveTabIndex(0);
  }, []);

  return (
    <Card w={"full"}>
      <Tabs p={5}>
        <TabList>
          {configOptions.map((option, index) => {
            return (
              <Link to={option.path} key={index}>
                <Tab>{option.name}</Tab>
              </Link>
            );
          })}
        </TabList>
      </Tabs>
      <Flex
        flexDir={"row"}
        flexGrow={1}
        alignContent={"center"}
        alignItems={"center"}
        p={6}
      >
        <Outlet />
      </Flex>
    </Card>
  );
}

export default Configuration;
