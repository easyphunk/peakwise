const getInputFields = () => {
    const inputFields = {
        login: [
            {
                name: 'username',
                type: 'text',
                label: 'Username',
                placeholder: 'Username',
                required: true
            },
            {
                name: 'password',
                type: 'password',
                label: 'Password',
                placeholder: '••••••••',
                required: true
            }

        ],

        register: [
            {
                name: 'username',
                type: 'text',
                label: 'Username',
                placeholder: 'Username',
                required: true
            },
            {
                name: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'you@example.com',
                required: true,
            },
            {
                name: 'password',
                type: 'password',
                label: 'Password',
                placeholder: '••••••••',
                required: true
            },
            {
                name: 'rePassword',
                type: 'password',
                label: 'Repeat Password',
                placeholder: '••••••••',
                required: true
            }
        ],

        trip: [
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                placeholder: 'e.g. Mount Everest',
                required: true
            },
            {
                name: 'location',
                type: 'text',
                label: 'Location',
                placeholder: 'e.g. Tibet/Khumbu, China/Nepal, Asia',
                required: true
            },
            {
                name: 'latitude',
                type: 'Number',
                step: 0.001,
                label: 'Latitude',
                placeholder: 'e.g. 27.981',
                required: true
            },
            {
                name: 'longitude',
                type: 'Number',
                step: 0.001,
                label: 'Longitude',
                placeholder: 'e.g. 86.925',
                required: true
            },
            {
                name: 'elevation',
                type: 'Number',
                step: 1,
                label: 'Elevation in metres',
                placeholder: 'e.g. 8848',
                required: true
            },
            {
                name: 'coverImage',
                type: 'text',
                label: 'Cover Image',
                placeholder: 'e.g. http://img.com/img1.jpg',
                required: true
            },
            {
                name: 'image1',
                type: 'text',
                label: 'Thumbnail image 1',
                placeholder: 'e.g. http://img.com/img1.jpg',
                required: true
            },
            {
                name: 'image2',
                type: 'text',
                label: 'Thumbnail image 2',
                placeholder: 'e.g. http://img.com/img1.jpg',
                required: true
            },
            {
                name: 'image3',
                type: 'text',
                label: 'Thumbnail image 3',
                placeholder: 'e.g. http://img.com/img1.jpg',
                required: true
            },
            {
                name: 'overview',
                type: 'textarea',
                label: 'Overview',
                placeholder: 'e.g. Mount Everest gets its European name from British Superintentant General of the Survey of India 1830-1843, Sir George Everest...',
                required: true
            },
            {
                name: 'climbingHistory',
                type: 'textarea',
                label: 'Climbing History',
                placeholder: 'e.g. In 1920 Sir Francis Younghusband received permission for an expedition to Everest from the Dalai Lama. This first team was headed by Charles Kenneth Howard-Bury...',
                required: true
            },
            {
                name: 'whenToClimb',
                type: 'textarea',
                label: 'When To Climb',
                placeholder: 'e.g. From April to May, even mid-June, is arguably the ideal time to Mount Everest; not only is the peak often visible and clear...',
                required: true
            },
            {
                name: 'gettingThere',
                type: 'textarea',
                label: 'Getting There',
                placeholder: 'e.g. Starting from Lhasa, take a bus (10 hours) or train (3 hours) to Shigatse, then private transport to the base camp (12 hours) via Dingri and Rongbuk Monastery (the highest religious building in the world)...',
                required: true
            }
        ]

    }
    
    return inputFields;
}

export default getInputFields;
