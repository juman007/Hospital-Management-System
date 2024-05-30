import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Department from '../components/Department'
import MessageForm from '../components/MessageForm'

const Home = () => {
    return (
        <>
            <Hero title={"Wellcome to ZeeCare Medical Institute | Your Trusted Health Care"} imageUrl={"/public/hero.png"} />
            <Biography imageUrl={"/public/about.png"} />
            <Department />
            <MessageForm />
        </>
    )
}

export default Home
