import React, { useState, useEffect } from 'react';
import './create_shipment.css';

const CreateShipment = () => {
    const [step, setStep] = useState(1);
    const [origin, setOrigin] = useState({
        fullName: '',
        company: '',
        email: '',
        telephone: '',
        country: 'India',
        address1: '',
        address2: '',
        landmark: '',
        zipCode: '',
        city: '',
        state: ''
    });

    const [destination, setDestination] = useState({
        fullName: '',
        company: '',
        email: '',
        telephone: '',
        country: 'India',
        address1: '',
        address2: '',
        landmark: '',
        zipCode: '',
        city: '',
        state: ''
    });

    const [pallet, setPallet] = useState({
        content: '',
        declaredValue: '',
        quantity: 1,
        length: '',
        width: '',
        height: '',
        weight: ''
    });

    const [payment, setPayment] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });

    const [trackingID, setTrackingID] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Generate tracking ID when component mounts
        setTrackingID(generateTrackingID());
    }, []);

    const handleOriginChange = (e) => {
        const { name, value } = e.target;
        setOrigin((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDestinationChange = (e) => {
        const { name, value } = e.target;
        setDestination((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePalletChange = (e) => {
        const { name, value } = e.target;
        setPallet((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPayment((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const generateTrackingID = () => {
        return 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    };

    const calculateTotalAmount = () => {
        const weight = parseFloat(pallet.weight) || 0;
        const costPer2Kg = 100;
        const gstRate = 0.05;
        const amount = (weight / 2) * costPer2Kg;
        const gst = amount * gstRate;
        return amount + gst;
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        const amount = calculateTotalAmount();
        setTotalAmount(amount);
        nextStep(); // Go to the final confirmation step
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const shipmentDetails = { origin, destination, pallet, trackingID, totalAmount };

        try {
            const response = await fetch('http://localhost:8080/shipments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(shipmentDetails)
            });

            if (response.ok) {
                setShowPopup(true);
            } else {
                console.error('Failed to save shipment details');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const closePopup = () => {
        setShowPopup(false);

        setOrigin({
            fullName: '',
            company: '',
            email: '',
            telephone: '',
            country: 'India',
            address1: '',
            address2: '',
            landmark: '',
            zipCode: '',
            city: '',
            state: ''
        });

        setDestination({
            fullName: '',
            company: '',
            email: '',
            telephone: '',
            country: 'India',
            address1: '',
            address2: '',
            landmark: '',
            zipCode: '',
            city: '',
            state: ''
        });

        setPallet({
            content: '',
            declaredValue: '',
            quantity: 1,
            length: '',
            width: '',
            height: '',
            weight: ''
        });

        setPayment({
            cardNumber: '',
            cardHolder: '',
            expiryDate: '',
            cvv: ''
        });

        setTotalAmount(0);
        setTrackingID(generateTrackingID()); // Reset tracking ID
        setStep(1);
    };

    return (
        <div className="shipment-container">
            <div className="shipment-left-section">
                <img src="https://img.freepik.com/free-photo/transport-logistics-products_23-2151541834.jpg?semt=ais_hybrid" alt="Background" />
            </div>
            <form className="shipment-right-section" onSubmit={handleSubmit}>
                <div className={`form-section ${step === 1 ? 'active' : ''}`}>
                    <div className="form-content">
                        <h3>Origin Address</h3>
                        <input type="text" name="fullName" value={origin.fullName} onChange={handleOriginChange} placeholder="Full Name " required />
                        <input type="text" name="company" value={origin.company} onChange={handleOriginChange} placeholder="Company" />
                        <input type="email" name="email" value={origin.email} onChange={handleOriginChange} placeholder="Email" />
                        <input type="text" name="telephone" value={origin.telephone} onChange={handleOriginChange} placeholder="Telephone " required />
                        <input type="text" name="country" value={origin.country} onChange={handleOriginChange} placeholder="Country " required />
                        <input type="text" name="address1" value={origin.address1} onChange={handleOriginChange} placeholder="Address 1 " required />
                        <input type="text" name="address2" value={origin.address2} onChange={handleOriginChange} placeholder="Address 2" />
                        <input type="text" name="landmark" value={origin.landmark} onChange={handleOriginChange} placeholder="Landmark" />
                        <input type="text" name="zipCode" value={origin.zipCode} onChange={handleOriginChange} placeholder="Zip Code " required />
                        <input type="text" name="city" value={origin.city} onChange={handleOriginChange} placeholder="City " required />
                        <input type="text" name="state" value={origin.state} onChange={handleOriginChange} placeholder="State" />
                        <button className="next-button" type="button" onClick={nextStep}>Next</button>
                    </div>
                </div>

                <div className={`form-section ${step === 2 ? 'active' : ''}`}>
                    <div className="form-content">
                        <h3>Destination Address</h3>
                        <input type="text" name="fullName" value={destination.fullName} onChange={handleDestinationChange} placeholder="Full Name " required />
                        <input type="text" name="company" value={destination.company} onChange={handleDestinationChange} placeholder="Company" />
                        <input type="email" name="email" value={destination.email} onChange={handleDestinationChange} placeholder="Email" />
                        <input type="text" name="telephone" value={destination.telephone} onChange={handleDestinationChange} placeholder="Telephone " required />
                        <input type="text" name="country" value={destination.country} onChange={handleDestinationChange} placeholder="Country *" required />
                        <input type="text" name="address1" value={destination.address1} onChange={handleDestinationChange} placeholder="Address 1 " required />
                        <input type="text" name="address2" value={destination.address2} onChange={handleDestinationChange} placeholder="Address 2" />
                        <input type="text" name="landmark" value={destination.landmark} onChange={handleDestinationChange} placeholder="Landmark" />
                        <input type="text" name="zipCode" value={destination.zipCode} onChange={handleDestinationChange} placeholder="Zip Code " required />
                        <input type="text" name="city" value={destination.city} onChange={handleDestinationChange} placeholder="City " required />
                        <input type="text" name="state" value={destination.state} onChange={handleDestinationChange} placeholder="State" />
                        <div className="navigation-buttons">
                            <button className="back-button" type="button" onClick={prevStep}>Back</button>
                            <button className="next-button" type="button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </div>

                <div className={`form-section ${step === 3 ? 'active' : ''}`}>
                    <div className="form-content">
                        <h3>Pallet #1</h3>
                        <input type="text" name="content" value={pallet.content} onChange={handlePalletChange} placeholder="Content Description " required />
                        <input type="number" name="declaredValue" value={pallet.declaredValue} onChange={handlePalletChange} placeholder="Declared Value (INR) " required />
                        <input type="number" name="quantity" value={pallet.quantity} onChange={handlePalletChange} placeholder="Quantity " min="1" required />
                        <input type="number" name="length" value={pallet.length} onChange={handlePalletChange} placeholder="Length (cm) " required />
                        <input type="number" name="width" value={pallet.width} onChange={handlePalletChange} placeholder="Width (cm) " required />
                        <input type="number" name="height" value={pallet.height} onChange={handlePalletChange} placeholder="Height (cm) " required />
                        <input type="number" name="weight" value={pallet.weight} onChange={handlePalletChange} placeholder="Weight (kg) " required />
                        <div className="navigation-buttons">
                            <button className="back-button" type="button" onClick={prevStep}>Back</button>
                            <button className="next-button" type="button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </div>

                <div className={`form-section ${step === 4 ? 'active' : ''}`}>
                    <div className="form-content">
                        <h3>Payment Details</h3>
                        <p>Tracking ID: {trackingID}</p>
                        <input type="text" name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} placeholder="Card Number " required />
                        <input type="text" name="cardHolder" value={payment.cardHolder} onChange={handlePaymentChange} placeholder="Card Holder Name" required />
                        <input type="text" name="expiryDate" value={payment.expiryDate} onChange={handlePaymentChange} placeholder="Expiry Date " required />
                        <input type="text" name="cvv" value={payment.cvv} onChange={handlePaymentChange} placeholder="CVV " required />
                        <div className="bill-amount">
                            <p>Total Amount (with GST): ₹ {totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="navigation-buttons">
                            <button className="back-button" type="button" onClick={prevStep}>Back</button>
                            <button className="submit-button" type="submit" onClick={handlePaymentSubmit}>Proceed to Payment</button>
                        </div>
                    </div>
                </div>

                <div className={`form-section ${step === 5 ? 'active' : ''}`}>
                    <div className="form-content">
                        <h3>Confirm Shipment Details</h3>
                        <p>Tracking ID: {trackingID}</p>
                        <p>Total Amount: ₹ {totalAmount.toFixed(2)}</p>
                        <button className="submit-button" type="submit">Submit</button>
                    </div>
                </div>
            </form>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Shipment Created Successfully!</h3>
                        <p>Your tracking ID is: {trackingID}</p>
                        <p>Total Amount Paid: ₹ {totalAmount.toFixed(2)}</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateShipment;
