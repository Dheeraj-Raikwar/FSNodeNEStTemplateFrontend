import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

interface TabData {
    label: string;
    component: React.ReactNode;
}

interface CustomTabsProps {
    tabData: TabData[];
    variantType?: "underlined" | "solid" | "bordered" | "light"
    showCardBackground?: boolean;
}

const AUTabs: React.FC<CustomTabsProps> = ({ tabData, variantType = 'underlined', showCardBackground = true}) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };


    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" variant={variantType} 
            classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#0c3456]",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-[#0c3456]"
              }}>
                {tabData.map((tab, key) => (
                    <Tab key={key} title={tab.label} className="pl-0 font-bold">
                        {/* <Card> */}
                            {/* <CardBody style={{ background: showCardBackground ? undefined : "none" }}> */}
                                {tab.component}
                            {/* </CardBody> */}
                        {/* </Card> */}
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
};

export default AUTabs;