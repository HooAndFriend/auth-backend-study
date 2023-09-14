import AWS from 'aws-sdk'
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_SES_REGION } from 'config'

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_SES_REGION,
})
const ses = new AWS.SES({ apiVersion: '2010-12-01' })

export const sendEmail = (
  to: string[],
  from: string,
  title: string,
  text: string,
) => {
  try {
    const params = {
      Destination: {
        ToAddresses: to,
        CcAddresses: [],
        BccAddresses: [],
      },
      Message: {
        Body: {
          Text: {
            Data: text,
            Charset: 'utf-8',
          },
        },
        Subject: {
          Data: title,
          Charset: 'utf-8',
        },
      },
      Source: from,
      ReplyToAddresses: [from],
    }

    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.log(err)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export const sendEmailHtml = (
  to: string,
  from: string,
  title: string,
  text: string,
) => {
  try {
    const params = {
      Destination: {
        ToAddresses: [to],
        CcAddresses: [],
        BccAddresses: [],
      },
      Message: {
        Body: {
          Html: {
            Data: text,
            Charset: 'utf-8',
          },
        },
        Subject: {
          Data: title,
          Charset: 'utf-8',
        },
      },
      Source: from,
      ReplyToAddresses: [from],
    }

    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.log(err)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export const sendEmailHtmlMultiple = (
  to: string[],
  from: string,
  title: string,
  text: string,
) => {
  try {
    const params = {
      Destination: {
        ToAddresses: to,
        CcAddresses: [],
        BccAddresses: [],
      },
      Message: {
        Body: {
          Html: {
            Data: text,
            Charset: 'utf-8',
          },
        },
        Subject: {
          Data: title,
          Charset: 'utf-8',
        },
      },
      Source: from,
      ReplyToAddresses: [from],
    }

    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.log(err)
      }
    })
  } catch (err) {
    console.log(err)
  }
}
