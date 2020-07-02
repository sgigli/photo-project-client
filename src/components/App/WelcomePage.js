import React from 'react'
import { Grid, Cell } from 'styled-css-grid'
import Image from 'react-bootstrap/Image'

const WelcomePage = (props) => {
  if (!props.user) {
    return (
      <Grid className="welcome-page" columns={5} rows={'80vh'} gap={'30px'}>
        <Cell className="welcome-img" width={3} center middle>
          <Image src="https://www.rachaelrayshow.com/sites/default/files/styles/1280x720/public/images/2020-05/stock_neapolitan_pizza_dough.jpg?h=d182e0a9&itok=Gjo0KGvz" thumbnail/>
        </Cell>
        <Cell className="welcome-img" width={2} center middle>
          <h1>Welcome to Photopia!</h1>
          <h5>For all photo lovers, you can post photos of anything that catches your eye,
            and see engaging pictures from other friends and users. Our favorite photos bring great memories,
            spark new aspirations, and enrich the ways we see the world around us.
          </h5>
          <h5>
            Everything from exciting trips to homecooked meals to quiet moments can be posted here. I personally love to
            cook and take photos of what comes out!
          </h5>
          <h5>
            Click the Demo button above to test out the app!
          </h5>
        </Cell>
      </Grid>
    )
  } else {
    return null
  }
}

export default WelcomePage
