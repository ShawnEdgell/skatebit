const sessionNewsItems = [
    {
        game: 'Session', // Identifying property
        title: 'Schoolyard DLC Trailer',
        date: 'February 22, 2024',
        description:
            'Get ready to vibe in the ultimate skate playground, where every rail, ledge, and gap is primed for epic tricks and sick lines on the Schoolyard!',
        videoUrl: 'https://www.youtube.com/embed/91yw2ohAciQ?si=xlc2D6bE26hd4Wnn',
        videoTitle: 'Schoolyard DLC Trailer'
    },
    {
        game: 'Session', // Identifying property
        title: 'Abandoned Mall DLC Trailer',
        date: 'October 26, 2023',
        description:
            'The skatepark skateboarders have been dreaming of. Check out the Abandoned Mall and find all the new spots where you can perform your best tricks.',
        videoUrl: 'https://www.youtube.com/embed/g2dp7yRc5xc?si=JXTYMwWaVQ96OTrR',
        videoTitle: 'Abandoned Mall DLC Trailer'
    },
    {
        game: 'Session', // Identifying property
        title: 'Waterpark & Chris Cole DLC Trailer',
        date: 'May 17, 2023',
        description:
            'Explore a brand-new map with the latest spots and missions. Your new playground is an old abandoned water park.',
        videoUrl: 'https://www.youtube.com/embed/f-_E8myW-C4?si=g8ykgWVu56JPsbBD',
        videoTitle: 'Waterpark & Chris Cole DLC Trailer'
    },
    {
        game: 'Session', // Identifying property
        title: 'Session: Skate Sim | Launch Trailer',
        date: 'September 22, 2022',
        description:
            'Explore a brand-new map with the latest spots and missions. Your new playground is an old abandoned water park.',
        videoUrl: 'https://www.youtube.com/embed/GPamFRBnykA?si=E6yok8rQGmim5ylq',
        videoTitle: 'Waterpark & Chris Cole DLC Trailer'
    },
    {
        game: 'Session', // Identifying property
        title: 'New Skater Reveal',
        date: 'September 19, 2022',
        description:
            'Torey Pudwill, Nora Vasconsellos, Samarria Brevard, and Ryan Thompson will join the fray, bringing the roster up to 16 big names. ',
        videoUrl: 'https://www.youtube.com/embed/_FCXzT5_sAA?si=eyDZmHRnKBky7TW9',
        videoTitle: 'New Skater Reveal'
    }
];

const skateNewsItems = [
    {
        game: 'Skate.', // Identifying property
        title: 'We Read Your Comments',
        date: 'Dec 21, 2023',
        description:
            'Cuz and Deran from Full Circle took some time ahead of the holidays to answer some of your burning questions about skate. They cover topics like flick-it controls, updated trick mechanics, console playtesting, and more.',
        videoUrl: 'https://www.youtube.com/embed/iXdQp0fmhCE?si=IC0HIfSPieLxaC97',
        videoTitle: 'We Read Your Comments | skate.'
    },
    {
        game: 'Skate.', // Identifying property
        title: 'The Board Room: Episode 4',
        date: 'August 17, 2023',
        description:
            'In this episode, the developers are pulling back the curtains and letting you in on the process of capturing new tricks, how we’re integrating tricks into our playtesting, as well as sharing our excitement about all the new features, animations and tricks we’re working on for skate.',
        videoUrl: 'https://www.youtube.com/embed/uZTUXMAPmxw?si=rZEaRf7wlH3z-cJU',
        videoTitle: 'The Board Room: Episode 4 | skate.'
    },
    {
        game: 'Skate.', // Identifying property
        title: 'The Board Room: Episode 3',
        date: 'April 20, 2023',
        description: "This episode covers activities and how we'll spend time in San Vansterdam.",
        videoUrl: 'https://www.youtube.com/embed/ItE4vo3fXcQ?si=Plt4TyGPzUEUJu5p',
        videoTitle: 'The Board Room: Episode 3 | skate.'
    }
];

const skaterxlNewsItems = [
    {
        game: 'Skater XL', // Identifying property
        title: 'Now Available On Nintendo Switch',
        date: 'December 5, 2023',
        description:
            'Skater XL has just dropped into the Nintendo Switch eShop, bringing all its skateboarding glory to your on-the-go gaming sessions...',
        videoUrl: 'https://www.youtube.com/embed/r6_wjWiXpx8',
        videoTitle: 'Skater XL Nintendo Switch Launch Trailer'
    },
    {
        game: 'Skater XL', // Identifying property
        title: 'Grabs Update On All Platforms',
        date: 'August 30, 2023',
        description:
            'More freedom with grabs is now available on PlayStation, Xbox, and in the public branch on Steam...',
        videoUrl: 'https://www.youtube.com/embed/tRuprTKtJOo',
        videoTitle: 'Skater XL Grabs Update On All Platforms'
    },
    {
        game: 'Skater XL', // Identifying property
        title: 'Fire Station Park now available in the Mod Browser',
        date: 'April 28, 2023',
        description:
            'Fire Station Park is now available in the Skater XL Mod Browser on PlayStation, Xbox, and PC coinciding with the grand opening of the brand new park in Fort Worth, Texas. The park was made possible by a generous donation from Dickies Skateboarding, and the construction is now complete, making it available in both physical and digital formats.',
        videoUrl: 'https://www.youtube.com/embed/2HO3nwkdslQ?si=OnP3oP7gAVQEL9oJ',
        videoTitle: 'Fire Station Park now available in the Mod Browser'
    },
    {
        game: 'Skater XL', // Identifying property
        title: 'Some new things brewing for 2023...',
        date: 'December 22, 2022',
        description:
            "Take a look at Skater XL's announcement trailer for some exciting features that were promised for 2023. As of 2024, they haven't been released yet...",
        videoUrl: 'https://www.youtube.com/embed/zIUTsIKBa_o',
        videoTitle: 'Skater XL - Some new things brewing for 2023...'
    }
];

const allNewsItems = [...sessionNewsItems, ...skaterxlNewsItems, ...skateNewsItems];
allNewsItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export { allNewsItems, sessionNewsItems, skateNewsItems, skaterxlNewsItems };