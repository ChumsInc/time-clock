export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const SET_ALERT = 'SET_ALERT';
export const DISMISS_ALERT = 'DISMISS_ALERT';

export const FETCH_VERSION = 'FETCH_VERSION';

export const SET_TAB = 'SET_TAB';
export const FETCH_BANNERS = 'FETCH_BANNERS';
export const SET_LOGIN_CODE = 'SET_LOGIN_CODE';
export const FETCH_CLOCK_USER = 'FETCH_CLOCK_USER';
export const FETCH_CLOCK_ACTION = 'FETCH_CLOCK_ACTION';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_COUNTDOWN_TIMER = 'SET_COUNTDOWN_TIMER';
export const FETCH_USER_ACTION = 'FETCH_USER_ACTION';
export const SELECT_PAY_PERIOD = 'SELECT_PAY_PERIOD';

export const CLOCK_ACTION_CLOCK_IN = 'clock-in';
export const CLOCK_ACTION_CLOCK_OUT = 'clock-out';

export const TABS = [
    {id: 'clock', title: 'Clock In/Out', icon: 'clock-fill'},
    {id: 'login', title: 'Info', icon: 'person-fill'},
    {id: 'approve', title: 'Approve', icon: 'hand-thumbs-up-fill'},
];

export const DEFAULT_BANNER = {
    "id": 12,
    "filename": "black bird.jpg",
    "overlay": "",
    "active": 1,
    "timestamp": "2020-09-30T16:36:07.000Z"
};

export const ENTRY_TIMECLOCK = 1;
export const ENTRY_MANUAL = 2;
export const ENTRY_HOLIDAY = 3;
export const ENTRY_PL = 4;
export const ENTRY_BEREAVJURY = 5;
export const ENTRY_OVERTIME = 6;
export const ENTRY_AUTOMATIC = 7;
export const ENTRY_COMPANY_TIME = 8;
export const ENTRY_SWAP_TIME = 9;
export const ENTRY_SUH = 10;
export const ENTRY_FMLA100 = 11;
export const ENTRY_FMLA67 = 12;

export const ENTRY_TYPE_DESCRIPTIONS = {
    [ENTRY_TIMECLOCK]: 'Time Clock',
    [ENTRY_MANUAL]: 'Manual Entry',
    [ENTRY_HOLIDAY]: 'Holiday',
    [ENTRY_PL]: 'Personal Leave',
    [ENTRY_BEREAVJURY]: 'Bereavement/Jury Duty',
    [ENTRY_AUTOMATIC]: 'Salary (Automated)',
    [ENTRY_COMPANY_TIME]: 'Company Time',
    [ENTRY_SWAP_TIME]: 'Swap Time',
    [ENTRY_SUH]: 'Southern Utah Holdings',
    [ENTRY_FMLA67]: 'FMLA Leave',
    [ENTRY_FMLA100]: 'FMLA Leave',
}


export const CLOCK_ACTION_URL = '/timeclock/online/clockaction.json.php';
export const CLOCK_IMAGE_URL = '/timeclock/images/:filename';
export const API_PATH_VERSION = 'package.json';
export const API_PATH_BANNERS = '/api/timeclock/images/active';
