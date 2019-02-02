import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "csab-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  @Input() placeholder: string;
  @Output() searchTerms = new EventEmitter<string>();
  searchText: string = "";
  onKey() {
    this.searchTerms.emit(this.searchText);
  }
}
