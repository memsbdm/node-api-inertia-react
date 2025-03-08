// @ts-nocheck
/* eslint-disable */
// --------------------------------------------------
// This file is auto-generated by Tuyau. Do not edit manually !
// --------------------------------------------------

import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type AuthRegisterGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/register_controller.ts').default['render'], false>
}
type AuthRegisterPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/auth/controllers/register_controller.ts').default['StoreUserValidator']>>
  response: MakeTuyauResponse<import('../app/auth/controllers/register_controller.ts').default['execute'], true>
}
type AuthLoginGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/login_controller.ts').default['render'], false>
}
type AuthLoginPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/auth/controllers/login_controller.ts').default['LoginValidator']>>
  response: MakeTuyauResponse<import('../app/auth/controllers/login_controller.ts').default['execute'], true>
}
type AuthLogoutDelete = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/logout_controller.ts').default['execute'], false>
}
type MeGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/users/controllers/me_controller.ts').default['render'], false>
}
type MeVerifyemailGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/users/controllers/verify_email_controller.ts').default['render'], false>
}
type MeVerifyemailIdGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/users/controllers/verify_email_controller.ts').default['execute'], false>
}
type MeVerifyemailResendPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/users/controllers/verify_email_controller.ts').default['resend'], false>
}
type ApiV1AuthLoginPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/auth/controllers/login_controller.ts').default['LoginValidator']>>
  response: MakeTuyauResponse<import('../app/auth/controllers/login_controller.ts').default['apiExecute'], true>
}
type ApiV1AuthRegisterPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/auth/controllers/register_controller.ts').default['StoreUserValidator']>>
  response: MakeTuyauResponse<import('../app/auth/controllers/register_controller.ts').default['apiExecute'], true>
}
type ApiV1AuthLogoutDelete = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/logout_controller.ts').default['apiExecute'], false>
}
type ApiV1MeVerifyemailResendPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/users/controllers/verify_email_controller.ts').default['apiResend'], false>
}
type ApiV1MeGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/users/controllers/me_controller.ts').default['executeApi'], false>
}
export interface ApiDefinition {
  'auth': {
    'register': {
      '$url': {
      };
      '$get': AuthRegisterGetHead;
      '$head': AuthRegisterGetHead;
      '$post': AuthRegisterPost;
    };
    'login': {
      '$url': {
      };
      '$get': AuthLoginGetHead;
      '$head': AuthLoginGetHead;
      '$post': AuthLoginPost;
    };
    'logout': {
      '$url': {
      };
      '$delete': AuthLogoutDelete;
    };
  };
  'me': {
    '$url': {
    };
    '$get': MeGetHead;
    '$head': MeGetHead;
    'verify-email': {
      '$url': {
      };
      '$get': MeVerifyemailGetHead;
      '$head': MeVerifyemailGetHead;
      ':token': {
        '$url': {
        };
        '$get': MeVerifyemailIdGetHead;
        '$head': MeVerifyemailIdGetHead;
      };
      'resend': {
        '$url': {
        };
        '$post': MeVerifyemailResendPost;
      };
    };
  };
  'api': {
    'v1': {
      'auth': {
        'login': {
          '$url': {
          };
          '$post': ApiV1AuthLoginPost;
        };
        'register': {
          '$url': {
          };
          '$post': ApiV1AuthRegisterPost;
        };
        'logout': {
          '$url': {
          };
          '$delete': ApiV1AuthLogoutDelete;
        };
      };
      'me': {
        'verify-email': {
          'resend': {
            '$url': {
            };
            '$post': ApiV1MeVerifyemailResendPost;
          };
        };
        '$url': {
        };
        '$get': ApiV1MeGetHead;
        '$head': ApiV1MeGetHead;
      };
    };
  };
}
const routes = [
  {
    params: [],
    name: 'home',
    path: '/',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'auth.register.render',
    path: '/auth/register',
    method: ["GET","HEAD"],
    types: {} as AuthRegisterGetHead,
  },
  {
    params: [],
    name: 'auth.register.execute',
    path: '/auth/register',
    method: ["POST"],
    types: {} as AuthRegisterPost,
  },
  {
    params: [],
    name: 'auth.login.render',
    path: '/auth/login',
    method: ["GET","HEAD"],
    types: {} as AuthLoginGetHead,
  },
  {
    params: [],
    name: 'auth.login.execute',
    path: '/auth/login',
    method: ["POST"],
    types: {} as AuthLoginPost,
  },
  {
    params: [],
    name: 'auth.logout.execute',
    path: '/auth/logout',
    method: ["DELETE"],
    types: {} as AuthLogoutDelete,
  },
  {
    params: [],
    name: 'me.render',
    path: '/me',
    method: ["GET","HEAD"],
    types: {} as MeGetHead,
  },
  {
    params: [],
    name: 'me.verify-email.render',
    path: '/me/verify-email',
    method: ["GET","HEAD"],
    types: {} as MeVerifyemailGetHead,
  },
  {
    params: ["token"],
    name: 'me.verify-email.execute',
    path: '/me/verify-email/:token',
    method: ["GET","HEAD"],
    types: {} as MeVerifyemailIdGetHead,
  },
  {
    params: [],
    name: 'me.verify-email.resend',
    path: '/me/verify-email/resend',
    method: ["POST"],
    types: {} as MeVerifyemailResendPost,
  },
  {
    params: [],
    name: 'auth.login.apiExecute',
    path: '/api/v1/auth/login',
    method: ["POST"],
    types: {} as ApiV1AuthLoginPost,
  },
  {
    params: [],
    name: 'auth.register.apiExecute',
    path: '/api/v1/auth/register',
    method: ["POST"],
    types: {} as ApiV1AuthRegisterPost,
  },
  {
    params: [],
    name: 'auth.logout.apiExecute',
    path: '/api/v1/auth/logout',
    method: ["DELETE"],
    types: {} as ApiV1AuthLogoutDelete,
  },
  {
    params: [],
    name: 'me.verify-email.apiResend',
    path: '/api/v1/me/verify-email/resend',
    method: ["POST"],
    types: {} as ApiV1MeVerifyemailResendPost,
  },
  {
    params: [],
    name: 'me.executeApi',
    path: '/api/v1/me',
    method: ["GET","HEAD"],
    types: {} as ApiV1MeGetHead,
  },
] as const;
export const api = {
  routes,
  definition: {} as ApiDefinition
}
