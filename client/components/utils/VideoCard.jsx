import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Stack, Text, Button } from '@chakra-ui/react'
import { CloseIcon, DeleteIcon } from '@chakra-ui/icons'

import { delVideo } from '../../api/firebase/db'

function VideoCard ({ video }) {
  const published = moment(video.publishedAt)?.format('ddd DD MMM')
  const desc = video.description?.split('↵')[0]
  const blurb = (desc.length > 100) ? desc.substring(0, 97) + '...' : desc

  const [confirmDelete, setConfirmDelete] = useState(false)
  const goTo = useNavigate()
  
  return (
    <Card maxW='sm' variant='elevated'>
      <CardBody>
        <Image
          src={video.thumbnails?.medium.url}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{video.title}</Heading>
          <Text>
            {blurb}
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            {published}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Stack direction='row' spacing={6} width='100%' justify='space-between'>
          {confirmDelete ? (
            <>
              <Button colorScheme='pink' onClick={() => delVideo(video.id)}>
                Remove forever
              </Button>
              <Button leftIcon={<CloseIcon />} onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => goTo(`/feeds/${video.feedId}`)}>
                {video.channelTitle || 'Channel'}
              </Button>
              <Button leftIcon={<DeleteIcon />} onClick={() => setConfirmDelete(true)}>
                Delete
              </Button>
            </>
          )}
        </Stack>  
      </CardFooter>
    </Card>
  )
}

export default VideoCard
