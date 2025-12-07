import React, { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

function Profile() {
    const [user, setUser] = useState({
        name: "Pavly",
        email: "bavlysedhom@gmail.com",
        password: "123456-Pavly",
        shippingAddress: "106 tomanbai",
    });

    const [edit, setEdit] = useState(false);
    const [backup, setBackup] = useState(null);

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    return (
        <MainLayout>
            <div>
                <div style={{ background: "#F1FAEE", padding: "30px", fontFamily: "sans-serif", minHeight: "100vh" }}>
                    <h1 style={{ color: "#1D3557", fontSize: "26px", fontWeight: "bold" }}>Profile Page</h1>
                    <form>
                        <div style={{ marginTop: "20px" }}>
                            <p style={{ color: "#1D3557", fontSize: "18px" }}>Name: {user.name}</p>
                            <input
                                name="name"
                                type="text"
                                value={user.name}
                                disabled={!edit}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <p style={{ color: "#1D3557", fontSize: "18px" }}>Email: {user.email}</p>
                            <input
                                name="email"
                                type="email"
                                value={user.email}
                                disabled={!edit}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <p style={{ color: "#1D3557", fontSize: "18px" }}>Password: {user.password}</p>
                            <input
                                name="password"
                                type="password"
                                value={user.password}
                                disabled={!edit}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <p style={{ color: "#1D3557", fontSize: "18px" }}>Shipping Address: {user.shippingAddress}</p>
                            <input
                                name="shippingAddress"
                                type="text"
                                value={user.shippingAddress}
                                disabled={!edit}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </div>

                {!edit && (
                    <button
                        onClick={() => { setBackup(user); setEdit(true); }}
                        style={{
                            marginTop: "20px",
                            padding: "10px 14px",
                            backgroundColor: "#E63946",
                            color: "#F1FAEE",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600",
                            marginRight: "10px"
                        }}
                    >
                        Edit
                    </button>
                )}

                {edit && (
                    <>
                        <button
                            onClick={() => { setEdit(false); setBackup(null); }}
                            style={{
                                marginTop: "20px",
                                padding: "10px 14px",
                                backgroundColor: "#1D3557",
                                color: "#F1FAEE",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "600",
                                marginRight: "10px"
                            }}
                        >
                            Save
                        </button>

                        <button
                            onClick={() => { setUser(backup); setEdit(false); setBackup(null); }}
                            style={{
                                marginTop: "20px",
                                padding: "10px 14px",
                                backgroundColor: "#A8A8A8",
                                color: "#1D3557",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "600"
                            }}
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </MainLayout>
    );
}

export default Profile;
