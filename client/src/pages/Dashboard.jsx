import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const summary = {
  income: 80000,
  expense: 39000
};

const quickInsights = {
  topCategory: 'Food',
  thisMonthExpense: 39000,
  lastMonthExpense: 33000,
  dailyAverage: 1300
};

const pieData = [
  { name: 'Income', value: summary.income },
  { name: 'Expense', value: summary.expense }
];

const monthlyExpenseData = [
  { month: 'Jan', expense: 26000 },
  { month: 'Feb', expense: 21000 },
  { month: 'Mar', expense: 34000 },
  { month: 'Apr', expense: 39000 },
  { month: 'May', expense: 28000 },
  { month: 'Jun', expense: 31000 }
];

const recentTransactions = [
  { category: 'Food', amount: -2000, date: '2026-04-11' },
  { category: 'Salary', amount: 50000, date: '2026-04-10' },
  { category: 'Rent', amount: -15000, date: '2026-04-08' },
  { category: 'Transport', amount: -800, date: '2026-04-07' },
  { category: 'Freelance', amount: 12000, date: '2026-04-05' },
  { category: 'Shopping', amount: -3200, date: '2026-04-04' }
];

const CURRENCY = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const DATE = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});

const pieColors = ['#16a34a', '#dc2626'];

const Dashboard = () => {
  const netBalance = summary.income - summary.expense;
  const diff = quickInsights.thisMonthExpense - quickInsights.lastMonthExpense;
  const diffLabel = diff > 0 ? 'higher' : diff < 0 ? 'lower' : 'same';
  const hasData =
    pieData.length > 0 ||
    monthlyExpenseData.length > 0 ||
    recentTransactions.length > 0;

  return (
    <main className='dashboard-page'>
      <section className='dashboard-header'>
        <h1>Financial Dashboard</h1>
        <p>Track your income, expenses, and spending trends in one place.</p>
      </section>

      {!hasData && (
        <section className='empty-state'>
          <h2>No data available</h2>
          <p>Add your first transaction to see cards, charts, and recent activity.</p>
        </section>
      )}

      {hasData && (
        <>
          <section className='summary-grid'>
            <article className='card summary-card income'>
              <h3>Total Income</h3>
              <p>{CURRENCY.format(summary.income)}</p>
            </article>

            <article className='card summary-card expense'>
              <h3>Total Expense</h3>
              <p>{CURRENCY.format(summary.expense)}</p>
            </article>

            <article className='card summary-card balance'>
              <h3>Net Balance</h3>
              <p>{CURRENCY.format(netBalance)}</p>
            </article>
          </section>

          <section className='insights-grid'>
            <article className='card insight-card'>
              <h3>Highest Spending Category</h3>
              <p>{quickInsights.topCategory}</p>
            </article>

            <article className='card insight-card'>
              <h3>This Month vs Last Month</h3>
              <p>
                {CURRENCY.format(Math.abs(diff))} {diffLabel}
              </p>
            </article>

            <article className='card insight-card'>
              <h3>Daily Average Spending</h3>
              <p>{CURRENCY.format(quickInsights.dailyAverage)}</p>
            </article>
          </section>

          <section className='charts-grid'>
            <article className='card chart-card'>
              <h3>Income vs Expense</h3>
              {pieData.length === 0 ? (
                <p className='inline-empty'>No chart data yet.</p>
              ) : (
                <div className='chart-wrap'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey='value'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        innerRadius={70}
                        outerRadius={105}
                        paddingAngle={4}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`${entry.name}-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => CURRENCY.format(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </article>

            <article className='card chart-card'>
              <h3>Monthly Expenses</h3>
              {monthlyExpenseData.length === 0 ? (
                <p className='inline-empty'>No monthly expense data yet.</p>
              ) : (
                <div className='chart-wrap'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={monthlyExpenseData}>
                      <XAxis dataKey='month' />
                      <YAxis />
                      <Tooltip formatter={(value) => CURRENCY.format(value)} />
                      <Bar dataKey='expense' fill='#f59e0b' radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </article>
          </section>

          <section className='card transactions-card'>
            <h3>Recent Transactions</h3>

            {recentTransactions.length === 0 ? (
              <p className='inline-empty'>No recent transactions yet.</p>
            ) : (
              <ul className='transaction-list'>
                {recentTransactions.slice(0, 10).map((item, index) => (
                  <li className='transaction-item' key={`${item.category}-${item.date}-${index}`}>
                    <div>
                      <strong>{item.category}</strong>
                      <span>{DATE.format(new Date(item.date))}</span>
                    </div>
                    <p className={item.amount < 0 ? 'amount expense' : 'amount income'}>
                      {item.amount < 0 ? '-' : '+'}
                      {CURRENCY.format(Math.abs(item.amount))}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default Dashboard