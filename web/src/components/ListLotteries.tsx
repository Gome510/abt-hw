import React, { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:3000';
function ListLotteries() {
  const [lotteries, setLotteries] = useState([]);

  async function fetchLotteries() {
    const response = await fetch(`${baseUrl}/lotteries`);
    const data = await response.json();
    setLotteries(data);
  }
  useEffect(() => {
    fetchLotteries();
  }, []);

  return <div>ListLotteries</div>;
}

export default ListLotteries;

function LotteryCard() {}
