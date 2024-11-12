import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const CurrencyExchange = () => {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];
    const API_KEY = '48e4e38e69224a4281f9599df411b678';

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get(
                    `https://api.currencyfreaks.com/v2.0/rates/latest`,
                    {
                        params: {
                            apikey: API_KEY,
                            symbols: currencies.join(',')
                        }
                    }
                );

                // Perhitungan Rate We Buy dan We Sell
                const formattedRates = currencies.map(currency => ({
                    currency,
                    exchangeRate: parseFloat(response.data.rates[currency]),
                    weBuy: (parseFloat(response.data.rates[currency]) * 1.05).toFixed(4),
                    weSell: (parseFloat(response.data.rates[currency]) * 0.95).toFixed(4)
                }));

                setRates(formattedRates);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-success text-white text-center">
                    <h2 className="mb-3 mt-3">Currency Rate</h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Currency</th>
                                    <th>We Buy</th>
                                    <th>Exchange Rate</th>
                                    <th>We Sell</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rates.map((rate) => (
                                    <tr key={rate.currency}>
                                        <td>{rate.currency}</td>
                                        <td>{rate.weBuy}</td>
                                        <td>{rate.exchangeRate.toFixed(4)}</td>
                                        <td>{rate.weSell}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-muted mt-3 text-start">
                        <small>
                            Rates are based on 1 USD
                            <br />
                            Last updated: {new Date().toLocaleString()}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyExchange;
