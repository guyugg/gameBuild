let split = location.hostname.split('.');
window['config'] = {
    api: '/',
    ws: (location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + location.host,
    title: '後台控制中心',
    gid_name: { },
    level: {
        '999': '最高管理員',
        '900': '高階管理員',
        '850': '管理員',    
        '800': '工程人員',
        '100': '一般人員',
    },
    gameGroups: [
        {
            'name': 'Slot-財神原賠率',
            'gid': [ '2102' ]
        },
        {
            'name': 'Slot-財神高賠率',
            'gid': [ '2103', '2113' ]
        },
        {
            'name': 'Slot-財神低賠率',
            'gid': [ '2104', '2105', '2109', '2112', '2114' ]
        },
        {
            'name': 'Slot-財神高賠率(無BG)',
            'gid': [ '2106', '2107', '2108', '2110', '2111' ]
        },
        {
            'name': 'Slot-15線-倍率(娛樂版)',
            'gid': [ '2121', '2122' ]
        },
        {
            'name': 'Slot-15線-倍率(博弈版)',
            'gid': [ '2123', '2124' ]
        },
        {
            'name': '超8',
            'gid': [ '1111', '1112', '1113' ]
        },
        {
            'name': 'TableGames',
            'gid': [ '1101', '1102', '1103', '1105', '1106', '1108', '1109', '1110', '1114' ]
        }
    ],
    currency: {
        'NONE': 'NONE',
        'TWD': 'TWD',
        'RMB': 'RMB',
        'MYR': 'MYR',
        'USD': 'USD',
        'THB': 'THB',
        'JPY': 'JPY',
        'HKD': 'HKD',
        'VND': 'VND'
    },
    currency_point: {
        'NONE': 2,
        'TWD': 2,
        'THB': 2,
        'JPY': 2,
        'RMB': 3,
        'USD': 3,
        'MYR': 3,
        'HKD': 3,
        'VND': 2
    },
    betTypes: {
        '1': 'Normal',
        '2': 'Bonus',
        '3': 'PreCharge',
        '4': 'JackPot',
        '11': 'MysteryJackPot',
        '12': 'RedBonus',
        '99': 'Independent'
    },
    jpTypes: {
        '1': 'JP1',
        '2': 'JP2',
        '3': 'JP3',
        '4': 'JP4',
        '9': '紅包'
    }
};