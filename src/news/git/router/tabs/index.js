"use strict";
import React from "react";
import { Tabs, WhiteSpace } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";

function renderTabBar(props) {
    return (
        <Sticky>
            {({ style }) => (
                <div style={{ ...style, zIndex: 1 }}>
                    <Tabs.DefaultTabBar {...props} />
                </div>
            )}
        </Sticky>
    );
}
const tabs = [
    { title: "First Tab" },
    { title: "Second Tab" },
    { title: "Third Tab" }
];

const TabExample = () => (
    <div>
        <WhiteSpace />
        <StickyContainer>
            <Tabs tabs={tabs} initalPage={"t2"} renderTabBar={renderTabBar}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "250px",
                        backgroundColor: "#333"
                    }}
                >
                    Content of first tab
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "250px",
                        backgroundColor: "#666"
                    }}
                >
                    Content of second tab
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "250px",
                        backgroundColor: "#999"
                    }}
                >
                    Content of third tab
                </div>
            </Tabs>
        </StickyContainer>
        <WhiteSpace />
    </div>
);

export default TabExample;
