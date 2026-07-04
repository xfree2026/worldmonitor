#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// 桌面端二进制入口：委托给 lib.rs 的 run()
// Android 端不使用此文件，而是通过 tauri::mobile_entry_point 直接调用 lib::run()
fn main() {
    world_monitor_lib::run();
}
