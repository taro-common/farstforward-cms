export default ({ env }) => {
    const uploadProvider = env('UPLOAD_PROVIDER', 's3');

    const uploadConfig =
        uploadProvider === 's3'
            ? {
                provider: 'aws-s3',
                providerOptions: {
                    baseUrl: env('S3_PUBLIC_URL'),
                    rootPath: env('S3_ROOT_PATH'),
                    s3Options: {
                        endpoint: env("S3_ENDPOINT"),
                        forcePathStyle: true,
                        credentials: {
                            accessKeyId: env('S3_ACCESS_KEY_ID'),
                            secretAccessKey: env('S3_ACCESS_SECRET'),
                        },
                        region: env('S3_REGION'),
                        params: {
                            ACL: env('S3_ACL', 'public-read'),
                            Bucket: env('S3_BUCKET'),
                        },
                    },
                },
                actionOptions: {
                    upload: {},
                    uploadStream: {},
                    delete: {},
                },
            }
            : {
                provider: 'local',
            };

    return {
        upload: {
            config: uploadConfig,
        },
        email: {
            config: {
                provider: 'nodemailer',
                providerOptions: {
                    host: env('SMTP_HOST', 'smtp.gmail.com'),
                    port: env.int('SMTP_PORT', 587),
                    secure: env.bool('SMTP_SECURE', false),
                    auth: {
                        user: env('SMTP_USERNAME'),
                        pass: env('SMTP_PASSWORD'),
                    },
                },
                settings: {
                    defaultFrom: env('SMTP_DEFAULT_FROM', env('SMTP_USERNAME')),
                    defaultReplyTo: env('SMTP_DEFAULT_REPLYTO', env('SMTP_USERNAME')),
                },
            },
        },
        'webp-converter': {
            enabled: true,
            config: {
                mimeTypes: undefined,
            },
        },
        'publisher': {
            enabled: true,
            config: {
                hooks: {
                    beforePublish: async ({ strapi, uid, entity }) => {
                        console.log('beforePublish');
                    },
                    afterPublish: async ({ strapi, uid, entity }) => {
                        console.log('afterPublish');
                    },
                    beforeUnpublish: async ({ strapi, uid, entity }) => {
                        console.log('beforeUnpublish');
                    },
                    afterUnpublish: async ({ strapi, uid, entity }) => {
                        console.log('afterUnpublish');
                    },
                },
            },
        },
        'preview-button': {
            config: {
                contentTypes: [
                    {
                        uid: 'api::blog.blog',
                        draft: {
                            url: env('CLIENT_URL') + '/blog/{slug}',
                            query: {
                                preview: 'true',
                            },
                            openTarget: 'StrapiPreviewPage',
                        },
                        published: {
                            url: env('CLIENT_URL') + '/blog/{slug}',
                            openTarget: 'StrapiPage',
                        },
                    },
                ],
            },
        },
    }
};