import {provide} from 'angular2/core';
import {XHRBackend, ConnectionBackend} from 'angular2/http';

import {AppConfiguration} from '../appConfig';
import {GeolocationService} from './geolocationService';
import {CameraService} from './cameraService';
import {DesktopCameraService} from './desktopCameraService';
import {MobileCameraService} from './mobileCameraService';
import {PlatformInformationService} from './platformInformationService';
import {NativeIntegrationService} from "./nativeIntegrationService";
import {ProfileService} from "./profileService";
import {AuthHttp} from './angular2-jwt';

declare var window;

export var APP_SERVICES = [
    provide(ConnectionBackend, { useClass: XHRBackend }),
    AppConfiguration,
    PlatformInformationService,
    NativeIntegrationService,
    GeolocationService,
    provide(CameraService, { useClass: window.cordova ? MobileCameraService : DesktopCameraService }),
    ProfileService,
    AuthHttp
];
