import './styles/index.scss'
import {Router} from "@core/Routes/Router";
import {DashboardPage} from "@/pages/DashboardPage";
import {ExcelPage} from "@/pages/ExcelPage";

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})

