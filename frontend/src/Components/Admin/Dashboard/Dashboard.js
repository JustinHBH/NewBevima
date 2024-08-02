import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateForAPI = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
  };

  const formatDateForDisplay = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const processChartData = useCallback((orders) => {
    const categorySales = {};
    let totalSales = 0;
    orders.forEach(order => {
      let items = [];
      try {
        items = JSON.parse(order.items);
      } catch (error) {
        console.error('Error parsing items JSON:', error);
        return;
      }

      items.forEach(item => {
        const { category_name, price, quantity } = item;
        const itemTotal = price * quantity;
        totalSales += itemTotal;
        if (!categorySales[category_name]) {
          categorySales[category_name] = 0;
        }
        categorySales[category_name] += itemTotal;
      });
    });

    const labels = Object.keys(categorySales);
    const categoryData = labels.map(label => categorySales[label]);

    setChartData({
      labels: [...labels, "TỔNG DOANH THU"],
      datasets: [{
        label: 'Doanh thu theo loại sản phẩm',
        data: [...categoryData, totalSales],
        backgroundColor: labels.map(() => 'rgba(75, 192, 192, 0.6)').concat('rgba(255, 99, 132, 0.6)'),
        borderColor: labels.map(() => 'rgba(75, 192, 192, 1)').concat('rgba(255, 99, 132, 1)'),
        borderWidth: 1
      }]
    });
  }, []);

  const fetchOrders = useCallback(async () => {
    const formattedDate = formatDateForAPI(selectedDate);
    try {
      const response = await axios.get(`http://localhost:3001/order/getByDate?date=${formattedDate}`);
      if (response.data && response.data.length > 0) {
        processChartData(response.data);
      } else {
        console.log('No data received for this date');
        setChartData({ labels: [], datasets: [] });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [selectedDate, processChartData]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className='dashboard-container'>
      <DatePicker
        className='datepicker'
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        closeOnScroll={true}
      />
      {chartData.datasets.length > 0 ? (
        <Bar data={chartData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `Doanh thu theo loại sản phẩm và tổng doanh thu vào ngày ${formatDateForDisplay(selectedDate)}`
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }} />
      ) : (
        <p>Không có doanh thu...</p>
      )}
    </div>
  );
};

export default Dashboard;
