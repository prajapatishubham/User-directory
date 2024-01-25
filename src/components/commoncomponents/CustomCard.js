import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import '../../assets/style/customcard.css'
const CustomCard = ({title, content}) => {
    return (
        <> 
        <Grid>
        <Card className='card-container'>
            <CardContent>
                <div className='post-title'>
                    {title}
                </div>
                <div className='post-content'>
                    {content}
                </div>
            </CardContent>
        </Card>
        </Grid>
        </>
    )
}

export default CustomCard