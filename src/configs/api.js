export const GetAllMovieAPI = async () => {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/nowAndSoon");
    let data = await res.json();
    return data;
}

export const GetAllCinemaAPI = async () => {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/cinemas");
    let data = await res.json();
    return data;
}

export const GetMovieDataBySlugAPI = async (slug) => {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/movieBySlug/${slug}`, {
        headers: {
            'accept': 'application/json'
        }
    });
    let data = await res.json();
    return data;
}

export const GetMovieDataAPI = async (movieId) => {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/movie/${movieId}`, {
        headers: {
            'accept': 'application/json'
        }
    });
    let data = await res.json();
    return data;
}

export const GetMovieDataByCinemaCodeAPI = async (cinemaCode) => {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/cinemas/${cinemaCode}`, {
        headers: {
            'accept': 'application/json'
        }
    });
    let data = await res.json();
    return data;
}

export const GetSeatComboPriceDataAPI = async () => {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/booking/detail", {
        headers: {
            'accept': 'application/json'
        }
    });
    let data = await res.json();
    return data;
}

export const GetUnavailableSeatsAPI = async (cinemaAndSessionId) => {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/TicketByShowCode/${cinemaAndSessionId}`, {
        headers: {
            'accept': 'application/json'
        }
    });
    let data = await res.json();
    return data;
}


export const PostTicketAPI = async (ticketData) => {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/Ticket", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
    })
    console.log(res);
    return res;
}

export const UserLoginAPI = async (loginData) => {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/Login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    // console.log(res);
    let data = await res.json();
    return data;
}

export const CreateAccountAPI = async (signUpData) => {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/user", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
    })
    return res;
}

export const UpdateUserNameAPI = async (newInfo) => {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/user", {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInfo)
    })
    return res;
}

export const UpdateUserPasswordAPI = async (newInfo) => {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/ChangePassword", {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInfo)
    })
    return res;
}

export const DeleteAccountAPI = async (email) => {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/user", {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    })
    return res;
}

export const GetAllTicketAPI = async (email) => {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/TicketByEmail/${email}`, {
        headers: {
            'accept': 'application/json'
        }
    });
    let data = await res.json();
    return data;
}

