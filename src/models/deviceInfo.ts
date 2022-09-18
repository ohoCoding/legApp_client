export interface Device {
  deviceType: string;
  deviceToken: string;
  isNotificationAgreement: boolean;
  isAdAgreement: boolean;
  isNightAdAgreement: boolean;
}

export const initialDevice: Device = {
  deviceType: '',
  deviceToken: '',
  isNotificationAgreement: false,
  isAdAgreement: false,
  isNightAdAgreement: false
}