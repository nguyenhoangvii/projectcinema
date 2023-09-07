import React, { useEffect, useState } from 'react'
import './Booking.scss'
import { useDispatch, useSelector } from 'react-redux';
import actBooking from '../../redux/actions/actBooking';
import actOrder from '../../redux/actions/actOrder';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const isLoginSuccess = useSelector(state => state.rdcLogin.isLoginSuccess)

    useEffect(() => {
        if (!isLoginSuccess) {
            nav('/')
        }
        // eslint-disable-next-line
    }, [isLoginSuccess])

    const unavailableSeats = useSelector(state => state.rdcBooking.unavailableSeats)
    const selectedMovieData = useSelector(state => state.rdcOrder.selectedMovieData)
    const selectedSessionData = useSelector(state => state.rdcOrder.selectedSessionData)
    const selectedCinemaData = useSelector(state => state.rdcOrder.selectedCinemaData)

    const [arrUnavailableSeats, SetArrUnavailableSeats] = useState([])
    useEffect(() => {
        dispatch({ type: actBooking.GET_UNAVAILABLE_SEAT, payload: selectedSessionData.id })
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        const unavailableSeatsArray = [];
        unavailableSeats.forEach(item => {
            const seatCodes = item.SeatCode.split(',').map(code => code.trim());
            unavailableSeatsArray.push(...seatCodes);
        });
        SetArrUnavailableSeats(unavailableSeatsArray);
    }, [unavailableSeats])
    useEffect(() => {
        console.log(arrUnavailableSeats);
    }, [arrUnavailableSeats])

    const bookingData = useSelector(state => state.rdcBooking);
    const seatData = bookingData.seatData;
    const [ticketData, SetTicketData] = useState([]);
    const [comboData, SetComboData] = useState([]);
    useEffect(() => {
        if (bookingData.ticketData && bookingData.comboData) {
            SetTicketData([...bookingData.ticketData]);
            SetComboData([...bookingData.comboData]);
        }
    }, [bookingData.ticketData, bookingData.comboData]);

    const [activeSessionIndex, setActiveSessionIndex] = useState(0); //0 là màn hình chọn ghế, 1 là màn hình chọn combo
    const [currentSeatsSelection, SetCurrentSeatsSelection] = useState([]); //Mảng chứa seatCodes của những ghế đang được chọn

    const [totalCost, SetTotalCost] = useState(0); //Tổng tiền

    useEffect(() => {
        // let currentComboString = "";

        let ticketCost = 0;
        ticketData.forEach(ticketType => {
            if (ticketType.quantity) {
                ticketCost = ticketCost + ticketType.quantity * ticketType.displayPrice;
            }
        });

        let comboCost = 0;
        comboData.forEach(comboType => {
            if (comboType.quantity) {
                comboCost = comboCost + comboType.quantity * comboType.displayPrice;
                // currentComboString += `${comboType.description} (${comboType.quantity}), `;
            }
        });

        // SetComboString(currentComboString);
        SetTotalCost(ticketCost + comboCost);
    }, [ticketData, comboData]);

    useEffect(() => {
        console.log(currentSeatsSelection);
    }, [currentSeatsSelection])

    // useEffect(() => {
    //     console.log(comboString);
    // }, [comboString])

    const HandleNavButton = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex > 1) {
            newIndex = 1;
            let seatString = currentSeatsSelection.join(', ');
            let comboString = "";
            comboData.forEach(comboType => {
                if (comboType.quantity) {
                    comboString += `${comboType.description} x${comboType.quantity}, `;
                }
            });
            dispatch({
                type: actOrder.SET_SEAT_COMBO_COST_ORDER, payload: {
                    Combo: comboString.slice(0, -2),
                    SeatCode: seatString,
                    Price: totalCost
                }
            })
            nav('/payment')
        }
        setActiveSessionIndex(newIndex);
    };

    const CheckSelectedSeatCode = (seatCode) => currentSeatsSelection.includes(seatCode);
    const CheckUnavailableSeatCode = (seatCode) => arrUnavailableSeats.includes(seatCode);

    const ExportSeatCode = ({ areaNumber, rowIndex, columnIndex }) => {
        const rowName = seatData[areaNumber - 1].rows[rowIndex].physicalName;
        const seatID = seatData[areaNumber - 1].rows[rowIndex].seats.find(seat => seat.position.columnIndex === columnIndex).id;
        return `${rowName + seatID}`
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    const UpdateTicketQuantity = (ticketTypeCode, action) => {
        SetTicketData(prevTicketData =>
            prevTicketData.map(prevTicketType => {
                if (prevTicketType?.ticketTypeCode === ticketTypeCode) {
                    switch (action) {
                        case "increase":
                            return {
                                ...prevTicketType,
                                quantity: !prevTicketType.quantity ? 1 : prevTicketType.quantity + 1,
                            };
                        case "decrease":
                            return {
                                ...prevTicketType,
                                quantity: prevTicketType.quantity - 1,
                            };
                        default:
                            return prevTicketType;
                    }
                } else {
                    return prevTicketType;
                }
            })
        );
    };

    const UpdateComboQuantity = (selectedComboData, action) => {
        SetComboData(prevComboData =>
            prevComboData.map(prevComboType => {
                if (prevComboType?.id === selectedComboData.id) {
                    switch (action) {
                        case "increase":
                            return {
                                ...prevComboType,
                                quantity: !prevComboType.quantity ? 1 : prevComboType.quantity + 1,
                            };
                        case "decrease":
                            return {
                                ...prevComboType,
                                quantity: prevComboType.quantity === 0 ? 0 : prevComboType.quantity - 1,
                            }
                        default:
                            return prevComboType;
                    }
                } else {
                    return prevComboType;
                }
            }))
    }


    const HandleSeatClick = (selectedSeat, rowName) => {
        const selectedSeatArea = selectedSeat.position.areaNumber;
        // const selectedSeatRowIndex = selectedSeat.position.rowIndex;
        const selectedSeatColumnIndex = selectedSeat.position.columnIndex;
        const selectedSeatCode = `${rowName}${selectedSeat.id}`;

        // console.log(selectedSeat, rowName);
        if (selectedSeatArea === 1) { //Khu vực ghế standard
            if (currentSeatsSelection.includes(selectedSeatCode)) { //Nếu ghế đang chọn đã tồn tại trong currentSeatsSelection
                SetCurrentSeatsSelection(currentSeatsSelection.filter(seatCode => seatCode !== selectedSeatCode));
                UpdateTicketQuantity("0729", "decrease"); // Giảm số lượng vé có ticketTypeCode là "0729"
            } else { //Nếu ghế đang chọn chưa tồn tại trong currentSeatsSelection
                SetCurrentSeatsSelection(currentSeatCodes => [...currentSeatCodes, selectedSeatCode]);
                UpdateTicketQuantity("0729", "increase"); // Tăng số lượng vé có ticketTypeCode là "0729"
            }

        } else { //Khu vực ghế couple
            if (selectedSeat.seatsInGroup !== null) {
                const otherCoupleSeatPosition = selectedSeat.seatsInGroup.find(otherSeat => otherSeat.columnIndex !== selectedSeatColumnIndex)
                const otherCoupleSeatCode = ExportSeatCode(otherCoupleSeatPosition)

                if (currentSeatsSelection.includes(selectedSeatCode)) {
                    SetCurrentSeatsSelection(currentSeatsSelection.filter(seatCode => seatCode !== selectedSeatCode && seatCode !== otherCoupleSeatCode));
                    UpdateTicketQuantity("0341", "decrease");
                } else {
                    SetCurrentSeatsSelection(currentSeatCodes => [...currentSeatCodes, selectedSeatCode, otherCoupleSeatCode]);
                    UpdateTicketQuantity("0341", "increase");
                }
            }
        }
    }

    useEffect(() => {
        dispatch({ type: actBooking.GET_SEAT_COMBO_PRICE_DATA })
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            {
                bookingData && <div className='booking'>
                    <div className="main-sessions-wrapper">
                        <div className="main-sessions" style={{ transform: `translateX(-${activeSessionIndex * 100}%)` }}>
                            <div className="session seat-session" >
                                <div className='screen'></div>
                                <div className='seats-wrapper'>
                                    {
                                        seatData.map((area, areaIndex) => {
                                            return <div key={areaIndex} className={`seat-area ${area.areaCategoryCode === "0000000002" ? "standard-area" : "couple-area"}`}>
                                                {
                                                    Array(area.height).fill(0).map((row, rowIndex) => {
                                                        let seatLoopIndex = 0; //Biến duyệt qua từng ghế để so sánh với columnIndex của ghế trên CSDL, nếu trùng nhau thì hiện ghế, không trùng tức là lối đi
                                                        return <div key={rowIndex} className='row'>
                                                            <span className={`row-name ${!area.rows[rowIndex].physicalName ? "way" : ""}`}>
                                                                {area.rows[rowIndex].physicalName}
                                                            </span>
                                                            {
                                                                Array(area.width).fill(0).map((seat, seatIndex) => {
                                                                    let seatLoopIndexCurrent = seatLoopIndex; //Lưu giá trị seatLoopIndex hiện tại vì sau đó seatLoopIndex sẽ ++, đồng thời phương thức map() chạy không đồng bộ nên sẽ ra giá trị sai khi truyền seatLoopIndex vào HandleSeatClick()
                                                                    if (!area.rows[rowIndex].physicalName) { //Không có physicalName, tức hàng này là lối đi
                                                                        return <span key={seatIndex} className='seat way' ></span>
                                                                    } else {
                                                                        if (seatLoopIndex < area.rows[rowIndex].seats.length && area.rows[rowIndex].seats[seatLoopIndex].position.columnIndex === seatIndex) {
                                                                            seatLoopIndex++;
                                                                            return (
                                                                                <span key={seatIndex}
                                                                                    className={`seat ${area.areaCategoryCode === "0000000004" ? "seat-couple " : ""}${CheckSelectedSeatCode(`${area.rows[rowIndex].physicalName + area.rows[rowIndex].seats[seatLoopIndexCurrent].id}`) ? "seat-current " : ""}${CheckUnavailableSeatCode(`${area.rows[rowIndex].physicalName + area.rows[rowIndex].seats[seatLoopIndexCurrent].id}`) ? "seat-unavailable " : ""}`}
                                                                                    onClick={() => HandleSeatClick(area.rows[rowIndex].seats[seatLoopIndexCurrent], area.rows[rowIndex].physicalName)}>
                                                                                    {area.rows[rowIndex].seats[seatLoopIndexCurrent].id}
                                                                                </span>
                                                                            )
                                                                        } else {
                                                                            return <span key={seatIndex} className='seat way'></span>
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                                <div className='seat-color-note'>
                                    <div> <span className='seat seat-available'></span> <label>Có thể chọn</label> </div>
                                    <div> <span className='seat seat-unavailable'></span> <label>Không thể chọn</label> </div>
                                    <div> <span className='seat seat-couple'></span> <label>Ghế đôi</label> </div>
                                    <div> <span className='seat seat-current'></span> <label>Đang chọn</label> </div>
                                </div>
                            </div>
                            <div className="session combo-session" >
                                <div className='cards-wrapper'>
                                    {
                                        comboData.map((comboType, index) => (
                                            <div className='card-wrapper' key={index}>
                                                <div className='card' onClick={() => UpdateComboQuantity(comboType, "increase")}>
                                                    <img alt='' src={comboType?.imageUrl} data-title='ABC' />
                                                    <p className='combo-name'>{comboType?.description}</p>
                                                </div>
                                                <div className="quantity">
                                                    <span onClick={() => UpdateComboQuantity(comboType, "decrease")} className="minus">-</span>
                                                    <span className="num">{comboType?.quantity ? comboType?.quantity : 0}</span>
                                                    <span onClick={() => UpdateComboQuantity(comboType, "increase")} className="plus">+</span>
                                                </div>
                                                <div className='price-tag'><span></span>{comboType?.displayPrice / 1000}K</div>
                                            </div>))
                                    }
                                </div>
                                <h1>Phim dài đến <span>{selectedMovieData?.duration} phút</span> đấy nhé,<br /> tiếp năng lượng thôi nào!</h1>
                                <button className="btn btn-white" onClick={() => { HandleNavButton(activeSessionIndex - 1) }}>
                                    TRỞ VỀ
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='bill-detail-session' >
                        <div className='movie-info-wrapper'>
                            <h1>{selectedMovieData?.name}</h1>
                            <h2>{selectedMovieData?.subName}</h2>
                            <p>Độ tuổi quy định: <b>{selectedMovieData?.age.toUpperCase()}</b></p>
                            <p>Rạp: <b>{selectedCinemaData?.cinemaName}</b> | <b>{selectedSessionData?.screenName}</b></p>
                            <p>Suất chiếu: <b>{selectedSessionData?.showTime}</b> | <b>{selectedSessionData?.dayOfWeekLabel}, {selectedSessionData?.showDate}</b></p>
                            {
                                currentSeatsSelection?.length > 0 &&
                                <p className='selected-seats'>
                                    Ghế đang chọn: {currentSeatsSelection?.map((value, index) => {
                                        if (index === currentSeatsSelection?.length - 1) {
                                            return <span key={index}>{value}.</span>
                                        } else {
                                            return <span key={index}>{value}, </span>
                                        }
                                    })}
                                </p>
                            }

                        </div>

                        <div className='order-detail-wrapper'>
                            <div className='items-wrapper'>
                                {
                                    ticketData.map((ticketType, ticketTypeIndex) => ticketType.quantity > 0 && (
                                        <div className='item' key={ticketTypeIndex}>
                                            <p className='item__name-quantity'>
                                                <span className='item__quantity'>{ticketType.quantity}x</span>
                                                <span className='item__name'>{ticketType.ticketTypeCode === "0729" ? "Ghế Member" : "Ghế Couple"}</span>
                                            </p>
                                            <p className='item__cost'>{formatCurrency(ticketType.quantity * ticketType.displayPrice)}</p>
                                        </div>)
                                    )
                                }
                                {
                                    comboData.map((comboType, comboTypeIndex) => comboType.quantity > 0 && (
                                        <div className='item' key={comboTypeIndex}>
                                            <p className='item__name-quantity'><span className='item__quantity'>{comboType.quantity}x</span><span className='item__name'>{comboType.description}</span></p>
                                            <p className='item__cost'>{formatCurrency(comboType.quantity * comboType.displayPrice)}</p>
                                        </div>
                                    ))
                                }

                            </div>
                            <h1>Tổng</h1>
                            <h1>{formatCurrency(totalCost)}</h1>

                            <button className="btn btn-gradient" onClick={() => { HandleNavButton(activeSessionIndex + 1) }}>
                                {activeSessionIndex === 1 ? "THANH TOÁN" : "TIẾP TỤC"}
                            </button>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

// {
//     "BankId": 0,
//     "CardNumber": "0000000000000000",
//     "CardName": "Nguyen Van A",
//     "ExpireDate": "0124",
//     "CVV": "888",

//     "Email": "user@example.com",

//     "CinemaName": "string",
//     "TheaterName": "string",
//     "FilmName": "string",
//     "ShowCode": "cinemaId-sessionId",
//     "ImageLandscape": "string",
//     "ImagePortrait": "string",
//     "ShowTime": "2023-01-13T20:30Z"

//     "Combo": "string",
//     "SeatCode": "string",
//     "Price": 0,
//   }
