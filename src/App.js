import React from "react";
// import loadable from "@loadable/component";
// import Loading from "./components/Loading";
import "./App.less";
import { Layout, PageHeader } from "antd";
import MainPage from "./pages/Main";

// Layout components
const { Content } = Layout;

// pages
// const MainPage = loadable(() => import("./pages/Main"), {
//     fallback: <Loading />
// });

export default function App() {
    // const [curMenu, setCurMenu] = useState("home");
    return (
        <Layout className="app">
            <PageHeader title="ERGO Wallet BackOffice" />
            <Content style={{background: 'white', paddingTop: '24px'}}>
                <MainPage />
            </Content>
        </Layout>
    );
}
