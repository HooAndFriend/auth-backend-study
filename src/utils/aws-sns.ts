import AWS from 'aws-sdk'
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_SNS_REGION } from 'config'

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_SNS_REGION,
})

const sns = new AWS.SNS({ apiVersion: '2010-03-31' })

const sendSms = (PhoneNumber: string, Message: string) => {
  const params = {
    Message,
    PhoneNumber,
  }

  sns.publish(params, (err, data) => {
    if (err) {
      console.log(err)
    }

    console.log(data)
  })
}

export default sendSms
