import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component"; // Ajusta la ruta según corresponda
import { config } from "./app/app.config.server";

bootstrapApplication(AppComponent, config)
  .catch(err => console.error(err));