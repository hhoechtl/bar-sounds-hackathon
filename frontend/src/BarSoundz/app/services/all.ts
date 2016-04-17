import {provide} from 'angular2/core';
import {XHRBackend, ConnectionBackend} from 'angular2/http';

import {AppConfiguration} from '../appConfig';
import {GeolocationService} from './geolocationService';
import {CameraService} from './cameraService';
import {DesktopCameraService} from './desktopCameraService';
import {MobileCameraService} from './mobileCameraService';
import {PlatformInformationService} from './platformInformationService';
import {NativeIntegrationService} from "./nativeIntegrationService";
import {LeaderBoardService} from "./leaderBoardService";
import {ProfileService} from "./profileService";
import {TracksService} from './tracksService';
import {BarService} from './barService';
import {SearchBarService} from './searchBarService';
import {AuthHttp, JwtHelper} from './angular2-jwt';

declare var window;

export var APP_SERVICES = [
    provide(ConnectionBackend, { useClass: XHRBackend }),
    AppConfiguration,
    PlatformInformationService,
    NativeIntegrationService,
    GeolocationService,
    provide(CameraService, { useClass: window.cordova ? MobileCameraService : DesktopCameraService }),
    ProfileService,
    TracksService,
    SearchBarService,
    BarService,
    JwtHelper,
    LeaderBoardService,
    AuthHttp
];
