package com.wibblystuff.gear

import android.os.Bundle

import com.crashlytics.android.Crashlytics
import com.facebook.react.ReactActivity

import io.fabric.sdk.android.Fabric

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (!BuildConfig.DEBUG) {
            Fabric.with(this, Crashlytics())
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "main"
    }
}
