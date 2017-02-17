package com.wibblystuff.gear;

import android.os.Bundle;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactActivity;

import io.fabric.sdk.android.Fabric;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (!BuildConfig.DEBUG) {
            Fabric.with(this, new Crashlytics());
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PocketGear";
    }
}
