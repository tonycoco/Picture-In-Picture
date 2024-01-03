//
//  AppDelegate.swift
//  Picture-In-Picture
//
//  Created by Tony Coconate on 12/20/23.
//

import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {
  func applicationDidFinishLaunching(_ notification: Notification) {
    // Override point for customization after application launch.
  }

  func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
    return true
  }
}
