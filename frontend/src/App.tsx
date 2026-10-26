import { useEffect, useState } from "react";

import {
  getAccounts,
  getTransactions,
  type Account,
  type Transaction,
} from "./services/api";


import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  ChartNoAxesCombined,
  Bell,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Plus,
  Eye,
  EyeOff,
} from "lucide-react";

import "./App.css";

function App() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState("");


const totalIncome = transactions
  .filter(
    (transaction) =>
      transaction.transactionType.toUpperCase() === "CREDIT"
  )
  .reduce((total, transaction) => total + Number(transaction.amount), 0);

const totalExpenses = transactions
  .filter(
    (transaction) =>
      transaction.transactionType.toUpperCase() === "DEBIT"
  )
  .reduce((total, transaction) => total + Number(transaction.amount), 0);


  useEffect(() => {
  async function loadAccounts() {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      console.error("Error loading accounts:", error);
      setAccountsError("Unable to load accounts. Please try again.");
    } finally {
      setAccountsLoading(false);
    }
  }

  loadAccounts();
}, []);


useEffect(() => {
  async function loadTransactions() {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
      setTransactionsError("Unable to load transactions. Please try again.");
    } finally {
      setTransactionsLoading(false);
    }
  }

  loadTransactions();
}, []);


  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Wallet size={23} />
          </div>
          <div>
            <h2>Finora</h2>
            <span>FINANCIAL DASHBOARD</span>
          </div>
        </div>

        <p className="menu-label">WORKSPACE</p>

        <nav className="navigation">
          <a className="nav-item active" href="#overview">
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </a>

          <a className="nav-item" href="#accounts">
            <CreditCard size={19} />
            <span>My Accounts</span>
          </a>

          <a className="nav-item" href="#transactions">
            <ArrowLeftRight size={19} />
            <span>Transactions</span>
          </a>

          <a className="nav-item" href="#investments">
            <TrendingUp size={19} />
            <span>Investments</span>
          </a>

          <a className="nav-item" href="#analytics">
            <ChartNoAxesCombined size={19} />
            <span>Analytics</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">
              <TrendingUp size={20} />
            </div>
            <h3>Grow your wealth</h3>
            <p>Track your money and build better financial habits.</p>
            <a href="#investments">Explore portfolio →</a>
          </div>

          <div className="profile">
            <div className="avatar">SB</div>
            <div className="profile-info">
              <strong>Saiprasad Bhise</strong>
              <span>Personal Account</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-divider">/</span>
            <strong>Overview</strong>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input type="search" placeholder="Search anything..." />
              <span className="shortcut">⌘ K</span>
            </label>

            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
              <span className="notification-dot"></span>
            </button>

            <div className="top-avatar">SB</div>
          </div>
        </header>

        <section className="page-content" id="overview">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">YOUR FINANCIAL OVERVIEW</p>
              <h1>Good afternoon, Saiprasad 👋</h1>
              <p className="page-subtitle">
                Here's what's happening with your money today.
              </p>
            </div>

            <button className="primary-button">
              <Plus size={18} />
              Add account
            </button>
          </div>

          <div className="summary-grid">
            <article className="summary-card balance-card">
              <div className="card-heading">
                <span>Total account balance</span>
                <button
                  className="visibility-button"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  aria-label={balanceVisible ? "Hide balances" : "Show balances"}
                >
                  {balanceVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              <h2>
                {balanceVisible ? "₹3,30,000.00" : "₹ ••••••"}
              </h2>

              <div className="balance-footer">
                <span className="positive-change">
                  <ArrowUpRight size={15} />
                  Demo portfolio
                </span>
                <span>Across 5 accounts</span>
              </div>

              <div className="balance-decoration decoration-one"></div>
              <div className="balance-decoration decoration-two"></div>
            </article>

            <article className="summary-card">
              <div className="metric-top">
                <div className="metric-icon income-icon">
                  <ArrowDownRight size={21} />
                </div>
                <span className="metric-period">Demo data</span>
              </div>
              <p className="metric-label">Total income</p>
              <h2>
  {transactionsLoading
    ? "Loading..."
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(totalIncome)}
</h2>
              <p className="metric-note">From recorded transactions</p>
            </article>

            <article className="summary-card">
              <div className="metric-top">
                <div className="metric-icon expense-icon">
                  <ArrowUpRight size={21} />
                </div>
                <span className="metric-period">Demo data</span>
              </div>
              <p className="metric-label">Total expenses</p>
              <h2>
  {transactionsLoading
    ? "Loading..."
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(totalExpenses)}
</h2>
              <p className="metric-note">From recorded transactions</p>
            </article>
          </div>

          <div className="section-grid">
            <section className="panel accounts-panel" id="accounts">
              <div className="panel-heading">
                <div>
                  <h2>My Accounts</h2>
                  <p>Keep track of your bank accounts</p>
                </div>
                <a href="#accounts">View all</a>
              </div>

              <div className="accounts-list">
  {accountsLoading ? (
    <p>Loading accounts...</p>
  ) : accountsError ? (
    <p role="alert">{accountsError}</p>
  ) : accounts.length === 0 ? (
    <p>No accounts found.</p>
  ) : (
    accounts.map((account, index) => (
      <article className="account-row" key={account.accountId}>
        <div className={`account-icon account-icon-${(index % 3) + 1}`}>
          <Wallet size={20} />
        </div>

        <div className="account-details">
          <strong>{account.accountName}</strong>
          <span>
            {account.accountType} · Account ID: {account.accountId}
          </span>
        </div>

        <strong className="account-balance">
          {balanceVisible
            ? new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: account.currency,
              }).format(account.balance)
            : "••••••"}
        </strong>
      </article>
    ))
  )}
</div>
            </section>

            <section className="panel portfolio-panel" id="investments">
              <div className="panel-heading">
                <div>
                  <h2>Investment Portfolio</h2>
                  <p>Your investment overview</p>
                </div>
                <div className="portfolio-icon">
                  <TrendingUp size={20} />
                </div>
              </div>

              <div className="portfolio-empty">
                <div className="portfolio-illustration">
                  <ChartNoAxesCombined size={32} />
                </div>
                <h3>Build your portfolio view</h3>
                <p>
                  Investment data isn't connected yet. We'll add holdings,
                  returns, and allocation charts in a later step.
                </p>
                <span className="coming-soon">COMING NEXT</span>
              </div>
            </section>
          </div>

          <section className="panel transactions-panel" id="transactions">
            <div className="panel-heading">
              <div>
                <h2>Recent Transactions</h2>
                <p>Review money moving in and out of your accounts</p>
              </div>
              <a href="#transactions">View all</a>
            </div>

            <div className="transaction-table-wrapper">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>TRANSACTION</th>
                    <th>CATEGORY</th>
                    <th>DATE</th>
                    <th className="amount-heading">AMOUNT</th>
                  </tr>
                </thead>
      
<tbody>
  {transactionsLoading ? (
    <tr>
      <td colSpan={4}>Loading transactions...</td>
    </tr>
  ) : transactionsError ? (
    <tr>
      <td colSpan={4} role="alert">{transactionsError}</td>
    </tr>
  ) : transactions.length === 0 ? (
    <tr>
      <td colSpan={4}>No transactions found.</td>
    </tr>
  ) : (
    transactions.map((transaction) => {
      const isIncome =
        transaction.transactionType.toUpperCase() === "CREDIT";

      return (
        <tr key={transaction.transactionId}>
          <td>
            <div className="transaction-name">
              <div
                className={`transaction-icon ${isIncome ? "income" : "expense"}`}
              >
                {isIncome ? (
                  <ArrowDownRight size={18} />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </div>
              <strong>{transaction.description}</strong>
            </div>
          </td>

          <td>
            <span className="category-label">
              {transaction.category}
            </span>
          </td>

          <td className="transaction-date">
            {new Date(transaction.transactionDate).toLocaleDateString("en-IN")}
          </td>

          <td
            className={`transaction-amount ${isIncome ? "income" : "expense"}`}
          >
            {isIncome ? "+" : "−"}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(transaction.amount)}
          </td>
        </tr>
      );
    })
  )}
</tbody>

              </table>
            </div>
          </section>

          <footer className="dashboard-footer">
            <span>Finora · Personal Finance Dashboard</span>
            <span>Development preview · Uses demo values</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;