import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DevitCard } from "@/components/DevitCard";
import { BarCharts } from "@/components/BarChart";
import { PieChartComponents } from "@/components/PieChart";
import QuickBalanceTransfer from "@/components/QuickTransfar";
import { RecentTransactions } from "@/components/RecentTransactions";

const CustomerDashboard = () => {
  return (
    <>
      <div className="flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-start gap-8 flex-col xl:flex-row">
        <DevitCard />
        <RecentTransactions />
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 xl:col-span-7">
          <BarCharts />
        </div>
        <div className="col-span-12 xl:col-span-5">
            <PieChartComponents />
            <QuickBalanceTransfer />
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
