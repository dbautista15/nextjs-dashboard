/** requests waterfalls are where the sequence of network requests depend on the completion of previous requests in the case of data fetching each request can only begin once the previous request has returned the data
 * you also have parallel fetching to avoid this by using promise.all()or promise.allsettled() in the data.ts file. this way the data fetching is faster the only disadvantage of relying on this js pattern is what happens if one data request is slower then all the other?
 */
import CardWrapper from '@/app/ui/dashboard/cards';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '../../lib/data';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
	const {
		numberOfCustomers,numberOfInvoices,totalPaidInvoices,totalPendingInvoices
	} = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton/>}>
        <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart  />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton/>}>
          <LatestInvoices /> 
        </Suspense>
      </div>
    </main>
  );
}