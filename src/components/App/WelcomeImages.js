import React from 'react'
import { Grid, Cell } from 'styled-css-grid'
import Image from 'react-bootstrap/Image'

const WelcomeImages = () => {
  return (
    <Grid columns={3}>
      <Cell width={1}>
        <Image src='https://cdn.jemediacorp.com/tracyjongblog/uploads/2017/07/delicious-1853300_960_720-960x500.jpg'/>
      </Cell>
      <Cell width={1} left={2} top={2}>
        <Image src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/autumn-in-the-white-mountains-of-new-hampshire-royalty-free-image-841380450-1567025100.jpg'/>
      </Cell>
      <Cell width={1} left={3} top={3}>
        <Image src='https://www-kiva-org.global.ssl.fastly.net/cms/sites/default/files/kivablog/matheus-ferrero-228716-unsplash.jpg'/>
      </Cell>
    </Grid>
  )
}

export default WelcomeImages
