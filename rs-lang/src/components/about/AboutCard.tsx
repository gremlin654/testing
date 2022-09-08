import { Button, Card, CardActions, CardContent, CardMedia, Link, Typography } from '@mui/material'

export function AboutCard({
  currentImage,
  currentText,
  currentTitle,
  currentLink,
}: {
  currentImage: string
  currentText: string
  currentTitle: string
  currentLink: string
}) {
  return (
    <Card sx={{ maxWidth: 345 }} className='about__card'>
      <CardMedia component='img' alt='Diffick' height='300' image={currentImage} />
      <CardContent>
        <h3>{currentTitle}</h3>
        <Typography variant='body2' color='text.secondary'>
          {currentText}
        </Typography>
        <a href={currentLink}>Github</a>
      </CardContent>
    </Card>
  )
}
