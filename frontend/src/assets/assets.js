import logo from './logo.png'
import userProfile from './userProfile.png'
import cleaner from './cleaner.png'
import Delivery from './delivery.png'
import Lawn from './lawn.png'

export const assets = {
    logo,
    userProfile
}

export const services = [
    {
        id: 1,
        name: 'House Cleaning',
        image: cleaner,
        Description:'Professional cleaning services for a spotless home.'
    },
    {
        id: 2,
        name: 'Delivery',
        image: Delivery,
        Description:'Get your packages delivered quickly and safely.'
    },
    {
        id: 3,
        name: 'Lawn Care',
        image: Lawn,
        Description:'Maintain a beautiful lawn with our expert care.'
    }
]