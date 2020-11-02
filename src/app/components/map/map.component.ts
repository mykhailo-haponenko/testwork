import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  locations = [];
  usersName = [];
  images = [];

  constructor(private authService: AuthService) {
    this.authService.getUsers();
  }

  ngOnInit(): void {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.authService.editCoordinates({ lat: position.coords.latitude, lon: position.coords.longitude })
      });
    }

    this.authService.users.subscribe(res => {
      res.forEach(user => {
        if (user.lat != null) {
          this.usersName.push(`${user.firstName} ${user.lastName}`);
          this.images.push(
            {
              url: user.image || '../../../assets/not-image.png', // url
              scaledSize: new google.maps.Size(50, 50), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
          )
          this.locations.push({ lat: Number(user.lat), lng: Number(user.lon) })
        }
      })
    })

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 6,
        center: { lat: 50.431759, lng: 30.517023 },
      }
    );

    // Create an array of alphabetical characters used to label the markers.
    const labels = this.usersName;

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    const image = this.images;
    const markers = this.locations.map((location, i) => {
      return new google.maps.Marker({
        position: location,
        label: labels[i],
        icon: image[i],
      }); 
    });

    // Add a marker clusterer to manage the markers.
    // @ts-ignore MarkerClusterer defined via script
    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });

  }

}

